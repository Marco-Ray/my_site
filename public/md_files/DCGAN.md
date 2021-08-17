# DCGAN——GAN的奠基之作

## 导语

本文是对Pytorch官网的[DCGAN Tutorial](https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html?highlight=dcgan)的翻译，是小猴子在学习过程中的记录，部分内容会按照小猴子的理解稍加修改以达到更容易理解的效果，期望通过这种方式加深对DCGAN以及复现细节的理解。

本教程将通过示例介绍 DCGAN。我们将训练一个生成对抗网络 (GAN) 在向它展示许多真实名人的照片后生成新的名人。这里的大部分代码来自 [pytorch/examples](https://github.com/pytorch/examples) 中的 dcgan 实现，本文档将对实现进行全面解释，并阐明该模型的工作原理和原因。但别担心，阅读本文不需要事先具备关于 GAN 的知识，但可能需要初学者花一些时间来推理实际发生的事情。此外，为了节省时间，拥有一个或两个 GPU 会有所帮助。现在，让我们从头开始！

## Generative Adversarial Networks

### What is a GAN？

GAN 是一个框架，用于教授 DL 模型捕获训练数据的分布，以便我们可以从相同的分布中生成新数据。 GAN 由 Ian Goodfellow 于 2014 年发明，并首次在论文[《Generative Adversarial Nets》 ](https://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)中描述。它们由两个不同的模型组成，一个生成器和一个鉴别器。生成器的工作是生成看起来像训练图像的“假”图像。鉴别器的工作是查看图像并输出它是来自生成器的真实训练图像还是假图像。在训练期间，生成器不断尝试通过生成越来越好的假图来欺骗判别器，而判别器则努力成为更好的侦探并正确分类真假图像。这个游戏的平衡是当生成器生成看起来好像直接来自训练数据的完美假货时，判别器总是以 50% 的置信度猜测生成器输出是真的还是假的。

现在，让我们从鉴别器开始定义一些要在整个教程中使用的符号。让 x 是表示图像的数据。D(x) 是鉴别器网络，它输出 x 来自训练数据而不是生成器的概率（标量）。在这里，由于我们正在处理图像，因此 D(x) 的输入是一个 C\*H\*W 大小为 3x64x64 的图像。直觉上，当 x 来自训练数据时，D(x) 应该是 HIGH（即1，小猴子注），而当 x 来自生成器时，D(x) 应该是 LOW（即0，小猴子注）。从这个角度，D(x) 也可以被认为是传统的二元分类器。

对于生成器的符号，令 z 是从标准正态分布中采样的潜在空间向量。 G(z) 表示将潜在向量 z 映射到数据空间的生成器函数。G 的目标是估计训练数据的分布（p<sub>data</sub>)，以便它可以从估计的分布（p<sub>g</sub>）生成假样本。

因此，D(G(z)) 是生成器 G 的输出是真实图像的概率（标量）。正如 [Goodfellow 的论文](https://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf)中所描述的，D 和 G 玩了一个极大极小博弈，其中 D 试图最大化它正确分类真假的概率 （
<img src="https://www.zhihu.com/equation?tex=log(D(x))" alt="log(D(x))" class="ee_img tr_noresize" eeimg="1">
），而 G 试图最小化 D 预测其的概率。输出是假的 (
<img src="https://www.zhihu.com/equation?tex=log(1-D(G(z)" alt="log(1-D(G(z)" class="ee_img tr_noresize" eeimg="1">
)。从论文来看，GAN 损失函数为

<img src="https://www.zhihu.com/equation?tex=
{\underset {G}min}{\underset {D}max}V(D,G)=E_{x \sim p_{data}(x)}[logD(x)]+E_{z \sim p_g(z)}[log(1-D(G(z)))]" alt="
{\underset {G}min}{\underset {D}max}V(D,G)=E_{x \sim p_{data}(x)}[logD(x)]+E_{z \sim p_g(z)}[log(1-D(G(z)))]" class="ee_img tr_noresize" eeimg="1">

理论上，这个极大极小博弈的解决方案是 
<img src="https://www.zhihu.com/equation?tex=p_g=p_{data}" alt="p_g=p_{data}" class="ee_img tr_noresize" eeimg="1">
，判别器随机猜测输入是真的还是假的。然而，GAN 的收敛理论仍在积极研究中，实际上模型并不总是收敛到这一点。

### What is a DCGAN?

DCGAN 是上述 GAN 的直接扩展，不同之处在于它分别在鉴别器和生成器中明确使用卷积和卷积转置层。它首先由 Radford 等人在论文[《使用深度卷积生成对抗网络进行无监督表示学习》](https://arxiv.org/pdf/1511.06434.pdf)中描述。鉴别器由跨步卷积层、BN层和 LeakyReLU 激活组成，输入是 3x64x64 的图像，输出是输入来自真实数据分布的标量概率。生成器由转置卷积层（也叫反卷积层，小猴子注）、BN层和 ReLU 激活组成，输入是从标准正态分布中提取的潜在向量 z，输出是 3x64x64的RGB 图像。 转置卷积层允许将潜在向量转换为与图像形状相同的体积。在论文中，作者还给出了一些关于如何设置优化器、如何计算损失函数以及如何初始化模型权重的提示，所有这些都将在接下来的部分中进行解释。

## 复现

### Import

```python
from __future__ import print_function
#%matplotlib inline
import argparse
import os
import random
import torch
import torch.nn as nn
import torch.nn.parallel
import torch.backends.cudnn as cudnn
import torch.optim as optim
import torch.utils.data
import torchvision.datasets as dset
import torchvision.transforms as transforms
import torchvision.utils as vutils
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from IPython.display import HTML

# Set random seed for reproducibility
manualSeed = 999
#manualSeed = random.randint(1, 10000) # use if you want new results
print("Random Seed: ", manualSeed)
random.seed(manualSeed)
torch.manual_seed(manualSeed)
```

Out:

> Random Seed: 999

### Inputs

让我们为运行定义一些输入：

* **dataroot** - 数据集文件夹根目录的路径。我们将在下一节中更多地讨论数据集

* **workers** - 使用 DataLoader 加载数据的工作线程数

* **batch_size** - 训练中使用的批量大小。 DCGAN 论文使用的批大小为 128

* **image_size** - 用于训练的图像的空间大小。此实现默认为 64x64。如果需要其他尺寸，则必须更改 D 和 G 的结构。有关更多详细信息，请参阅 [此处](https://github.com/pytorch/examples/issues/70)

* **nc** -  输入图像中的颜色通道数。对于彩色图像，这是 3

* **nz** - 潜在向量的长度

* **ngf** - 与生成器内部的特征图的深度有关（number of generator feature maps，类比ndf，小猴子注）

* **ndf** - 设置通过鉴别器传播的特征图的深度

* **num_epochs** - 要运行的训练时期数。训练更长时间可能会带来更好的结果，但也需要更长的时间

* **lr** - 训练的学习率。如 DCGAN 论文中所述，这个数字应该是 0.0002

* **beta1** - Adam 优化器的 beta1 超参数。如论文中所述，此数字应为 0.5

* **ngpu** - 可用的 GPU 数量。如果这是 0，代码将在 CPU 模式下运行。如果此数字大于 0，它将在该数量的 GPU 上运行

  ```python
  # Root directory for dataset
  dataroot = "data/celeba"
  
  # Number of workers for dataloader
  workers = 2
  
  # Batch size during training
  batch_size = 128
  
  # Spatial size of training images. All images will be resized to this
  #   size using a transformer.
  image_size = 64
  
  # Number of channels in the training images. For color images this is 3
  nc = 3
  
  # Size of z latent vector (i.e. size of generator input)
  nz = 100
  
  # Size of feature maps in generator
  ngf = 64
  
  # Size of feature maps in discriminator
  ndf = 64
  
  # Number of training epochs
  num_epochs = 5
  
  # Learning rate for optimizers
  lr = 0.0002
  
  # Beta1 hyperparam for Adam optimizers
  beta1 = 0.5
  
  # Number of GPUs available. Use 0 for CPU mode.
  ngpu = 1
  ```

  ### Data

  在本教程中，我们将使用 [Celeb-A Faces 数据集](http://mmlab.ie.cuhk.edu.hk/projects/CelebA.html)，该数据集可以在链接站点或 [Google Drive](https://drive.google.com/drive/folders/0B7EVK8r0v71pTUZsaXdaSnZBZzg) 中下载。数据集将下载为名为 *img_align_celeba.zip* 的文件。下载后，创建一个名为 celeba 的目录并将 zip 文件解压缩到该目录中。然后，将此笔记本的 dataroot 输入设置为您刚刚创建的 celeba 目录。生成的目录结构应该是：

  >/path/to/celeba
  >
  >​	-> img_align_celeba
  >
  >​		-> 188242.jpg
  >
  >​		-> 173822.jpg
  >
  >​		-> 284702.jpg
  >
  >​		-> 537394.jpg
  >
  >​		...

这是重要的一步，因为我们将使用 ImageFolder 数据集类，它要求数据集的根文件夹中有子目录。现在，我们可以创建数据集、创建数据加载器、设置要运行的设备，最后将一些训练数据可视化。

```python
# We can use an image folder dataset the way we have it setup.
# Create the dataset
dataset = dset.ImageFolder(root=dataroot,
                           transform=transforms.Compose([
                               transforms.Resize(image_size),
                               transforms.CenterCrop(image_size),
                               transforms.ToTensor(),
                               transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
                           ]))
# Create the dataloader
dataloader = torch.utils.data.DataLoader(dataset, batch_size=batch_size,
                                         shuffle=True, num_workers=workers)

# Decide which device we want to run on
device = torch.device("cuda:0" if (torch.cuda.is_available() and ngpu > 0) else "cpu")

# Plot some training images
real_batch = next(iter(dataloader))
plt.figure(figsize=(8,8))
plt.axis("off")
plt.title("Training Images")
plt.imshow(np.transpose(vutils.make_grid(real_batch[0].to(device)[:64], padding=2, normalize=True).cpu(),(1,2,0)))
```

> ![](https://gitee.com/Marco-Ray/for-pic-go/raw/master/img/20210608215432.png)

### Inplementation

设置好输入参数并准备好数据集后，我们现在可以开始复现了。我们将从权重初始化策略开始，然后详细讨论生成器、鉴别器、损失函数和训练循环。

#### 权重初始化

从 DCGAN 论文中，作者指定所有模型权重都应从 
<img src="https://www.zhihu.com/equation?tex=mean=0" alt="mean=0" class="ee_img tr_noresize" eeimg="1">
、
<img src="https://www.zhihu.com/equation?tex=stdev=0.02" alt="stdev=0.02" class="ee_img tr_noresize" eeimg="1">
 的正态分布随机初始化。 weights_init 函数将初始化的模型作为输入，并重新初始化所有卷积、卷积转置和批量归一化层以满足此标准。此函数在初始化后立即应用于模型。

```python
# custom weights initialization called on netG and netD
def weights_init(m):
    classname = m.__class__.__name__
    if classname.find('Conv') != -1:
        nn.init.normal_(m.weight.data, 0.0, 0.02)
    elif classname.find('BatchNorm') != -1:
        nn.init.normal_(m.weight.data, 1.0, 0.02)
        nn.init.constant_(m.bias.data, 0)
```

#### Generator

生成器 G 旨在将潜在空间向量 (z) 映射到数据空间。由于我们的数据是图像，因此将 z 转换为数据空间意味着最终创建与训练图像大小相同的 RGB 图像（即 3x64x64）。在实践中，这是通过一系列跨步二维转置卷积层实现的，每个层都与一个 2维 BN层和一个 ReLU 激活组合。生成器的输出通过 tanh 函数馈送以将其返回到 [-1,1] 的输入数据范围。值得注意的是，在 conv-transpose 层之后存在BN函数，因为这是 DCGAN 论文的重要贡献。这些层有助于训练期间的梯度流动。 DCGAN 论文中的生成器图像如下所示。

![](https://gitee.com/Marco-Ray/for-pic-go/raw/master/img/20210608220107.png)

请注意，我们在输入部分（nz、ngf 和 nc）中设置的输入如何影响代码中的生成器架构。 nz 是 z 输入向量的长度，ngf 与通过生成器传播的特征图的大小有关，nc 是输出图像中的通道数（RGB 图像设置为 3）。下面是生成器的代码。

```python
# Generator Code

class Generator(nn.Module):
    def __init__(self, ngpu):
        super(Generator, self).__init__()
        self.ngpu = ngpu
        self.main = nn.Sequential(
            # input is Z, going into a convolution
            nn.ConvTranspose2d( nz, ngf * 8, 4, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 8),
            nn.ReLU(True),
            # state size. (ngf*8) x 4 x 4
            nn.ConvTranspose2d(ngf * 8, ngf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            # state size. (ngf*4) x 8 x 8
            nn.ConvTranspose2d( ngf * 4, ngf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            # state size. (ngf*2) x 16 x 16
            nn.ConvTranspose2d( ngf * 2, ngf, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            # state size. (ngf) x 32 x 32
            nn.ConvTranspose2d( ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh()
            # state size. (nc) x 64 x 64
        )

    def forward(self, input):
        return self.main(input)
```

(为加深理解，[这里](https://www.zhihu.com/question/43609045/answer/120266511)详细阐述了转置卷积各个参数具体的解释。其实，转置卷积就是相对于卷积的逆运算，因此可以通过计算输出特征图通过相同参数（输入输出通道相反）的卷积层后得到的特征图尺寸来理解、设置各个参数。特别值得注意的是，生成器第一个转置卷积层输入nz\*1*1的Z向量，可以理解为深度为nz的1\*1的特征图，每个1\*1的特征图经过第一个转置卷积层输出4\*4的特征图。本段由小猴子注）

现在，我们可以实例化生成器并应用 **weights_init** 函数。查看打印的模型以了解生成器对象的结构。

```python
# Create the generator
netG = Generator(ngpu).to(device)

# Handle multi-gpu if desired
if (device.type == 'cuda') and (ngpu > 1):
    netG = nn.DataParallel(netG, list(range(ngpu)))

# Apply the weights_init function to randomly initialize all weights
#  to mean=0, stdev=0.2.
netG.apply(weights_init)

# Print the model
print(netG)
```

Out：

>```
>Generator(
>  (main): Sequential(
>    (0): ConvTranspose2d(100, 512, kernel_size=(4, 4), stride=(1, 1), bias=False)
>    (1): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (2): ReLU(inplace=True)
>    (3): ConvTranspose2d(512, 256, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (4): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (5): ReLU(inplace=True)
>    (6): ConvTranspose2d(256, 128, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (7): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (8): ReLU(inplace=True)
>    (9): ConvTranspose2d(128, 64, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (10): BatchNorm2d(64, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (11): ReLU(inplace=True)
>    (12): ConvTranspose2d(64, 3, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (13): Tanh()
>  )
>```

#### Discriminator

如前所述，鉴别器 D 是一个二元分类网络，它将图像作为输入并输出输入图像是真实的（而不是假的）的标量概率。在这里，D 采用 3x64x64 输入图像，通过一系列 Conv2d、BatchNorm2d 和 LeakyReLU 层对其进行处理，并通过 Sigmoid 激活函数输出最终概率。如果需要，这种架构可以根据实际问题扩展更多层，但使用跨步卷积、BN层 和 LeakyReLUs 具有重要意义。 DCGAN 论文提到使用跨步卷积而不是池化来下采样是一个很好的做法，因为它可以让网络学习自己的池化函数。BN层和LeakyReLU函数也促进了健康的梯度流，这对于 G 和 D 的学习过程至关重要。

```python
# Discriminator Code

class Discriminator(nn.Module):
    def __init__(self, ngpu):
        super(Discriminator, self).__init__()
        self.ngpu = ngpu
        self.main = nn.Sequential(
            # input is (nc) x 64 x 64
            nn.Conv2d(nc, ndf, 4, 2, 1, bias=False),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf) x 32 x 32
            nn.Conv2d(ndf, ndf * 2, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 2),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*2) x 16 x 16
            nn.Conv2d(ndf * 2, ndf * 4, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 4),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*4) x 8 x 8
            nn.Conv2d(ndf * 4, ndf * 8, 4, 2, 1, bias=False),
            nn.BatchNorm2d(ndf * 8),
            nn.LeakyReLU(0.2, inplace=True),
            # state size. (ndf*8) x 4 x 4
            nn.Conv2d(ndf * 8, 1, 4, 1, 0, bias=False),
            nn.Sigmoid()
        )

    def forward(self, input):
        return self.main(input)
```

现在，与生成器一样，我们可以创建鉴别器，应用 weights_init 函数，并打印模型的结构。

```python
# Create the Discriminator
netD = Discriminator(ngpu).to(device)

# Handle multi-gpu if desired
if (device.type == 'cuda') and (ngpu > 1):
    netD = nn.DataParallel(netD, list(range(ngpu)))

# Apply the weights_init function to randomly initialize all weights
#  to mean=0, stdev=0.2.
netD.apply(weights_init)

# Print the model
print(netD)
```

Out：

>Discriminator(
>  (main): Sequential(
>    (0): Conv2d(3, 64, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (1): LeakyReLU(negative_slope=0.2, inplace=True)
>    (2): Conv2d(64, 128, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (3): BatchNorm2d(128, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (4): LeakyReLU(negative_slope=0.2, inplace=True)
>    (5): Conv2d(128, 256, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (6): BatchNorm2d(256, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (7): LeakyReLU(negative_slope=0.2, inplace=True)
>    (8): Conv2d(256, 512, kernel_size=(4, 4), stride=(2, 2), padding=(1, 1), bias=False)
>    (9): BatchNorm2d(512, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
>    (10): LeakyReLU(negative_slope=0.2, inplace=True)
>    (11): Conv2d(512, 1, kernel_size=(4, 4), stride=(1, 1), bias=False)
>    (12): Sigmoid()
>  )
>)

#### 损失函数以及优化器

通过对 D 和 G 的设置，我们可以指定它们如何通过损失函数和优化器进行学习。我们将使用 PyTorch 中定义的二元交叉熵损失 ([BCELoss](https://pytorch.org/docs/stable/nn.html#torch.nn.BCELoss)) 函数：

<img src="https://www.zhihu.com/equation?tex=
l(x,y)=L=\{l_1,...,l_N\}^T,l_n=-[y_n \cdot logx_n + (1-y_n) \cdot log(1-x_n)]" alt="
l(x,y)=L=\{l_1,...,l_N\}^T,l_n=-[y_n \cdot logx_n + (1-y_n) \cdot log(1-x_n)]" class="ee_img tr_noresize" eeimg="1">

请注意此函数如何提供目标函数中的两个对数分量的计算（即 
<img src="https://www.zhihu.com/equation?tex=log(D(x)" alt="log(D(x)" class="ee_img tr_noresize" eeimg="1">
) 和 
<img src="https://www.zhihu.com/equation?tex=log(1-D(G(z)))" alt="log(1-D(G(z)))" class="ee_img tr_noresize" eeimg="1">
)。我们可以指定 BCE 方程的哪一部分与 y 输入一起使用。这是在即将推出的训练循环中完成的，但重要的是要了解我们如何仅通过更改 y（即 GT 标签）来选择我们希望计算的组件。

接下来，我们将真实标签定义为 1，将假标签定义为 0。这些标签将在计算 D 和 G 的损失时使用，这也是原始 GAN 论文中使用的约定。最后，我们设置了两个单独的优化器，一个用于 D，一个用于 G。如 DCGAN 论文中所述，两者都是 Adam 优化器，学习率为 0.0002，Beta1 = 0.5。为了跟踪生成器的学习进程，我们将生成一组**固定的潜在向量**（即 fixed_noise)（见[Import](#Import)部分，固定了随机种子，因此每次生成的随机向量都是固定的），这些向量是从高斯分布中提取的。在训练循环中，我们会周期性地将这个 fixed_noise 输入到 G 中，在迭代过程中，我们将看到从噪声中形成的图像。

```python
# Initialize BCELoss function
criterion = nn.BCELoss()

# Create batch of latent vectors that we will use to visualize
#  the progression of the generator
fixed_noise = torch.randn(64, nz, 1, 1, device=device) # 64个100*1*1的z向量（小猴子注）

# Establish convention for real and fake labels during training
real_label = 1.
fake_label = 0.

# Setup Adam optimizers for both G and D
optimizerD = optim.Adam(netD.parameters(), lr=lr, betas=(beta1, 0.999))
optimizerG = optim.Adam(netG.parameters(), lr=lr, betas=(beta1, 0.999))
```

#### Training

最后，现在我们已经定义了 GAN 框架的所有部分，我们可以训练它了。请注意，训练 GAN需要一点艺术（原文为somewhat of an art form，小猴子注），因为不正确的超参数设置会导致模式崩溃，而几乎没有解释出什么问题。在这里，我们将密切关注 Goodfellow 论文中的算法 1，同时遵守 [ganhacks](https://github.com/soumith/ganhacks) 中展示的一些最佳实践。也就是说，我们将“为真实和虚假的图像构建不同的小批量”，并调整 G 的目标函数以最大化 
<img src="https://www.zhihu.com/equation?tex=logD(G(z))" alt="logD(G(z))" class="ee_img tr_noresize" eeimg="1">
。训练分为两个主要部分。第 1 部分更新鉴别器，第 2 部分更新生成器。

##### Part1 - 训练鉴别器

回想一下，训练鉴别器的目标是最大化将给定输入正确分类为真实或虚假的概率。按 Goodfellow 的话说，我们希望“通过提升其随机梯度来更新鉴别器”。实际上，我们希望最大化 
<img src="https://www.zhihu.com/equation?tex=log(D(x)) + log(1-D(G(z)))" alt="log(D(x)) + log(1-D(G(z)))" class="ee_img tr_noresize" eeimg="1">
。由于来自 ganhacks 的单独小批量建议，我们将分两步计算。首先，我们将从训练集中构造一批真实样本，前向传播通过 D，计算损失 (
<img src="https://www.zhihu.com/equation?tex=log(D(x)" alt="log(D(x)" class="ee_img tr_noresize" eeimg="1">
)，然后在后向传播中计算梯度。其次，我们将用当前生成器构造一批假样本，将这批样本前向传播通过 D，计算损失 
<img src="https://www.zhihu.com/equation?tex=(log(1-D(G(z))))" alt="(log(1-D(G(z))))" class="ee_img tr_noresize" eeimg="1">
，并通过后向传播累积梯度。现在，随着从全真和全假批次累积了梯度，我们称之为鉴别器优化器的步骤。

##### Part2 - 训练生成器

正如原始论文中所述，我们希望通过最小化 
<img src="https://www.zhihu.com/equation?tex=log(1-D(G(z)))" alt="log(1-D(G(z)))" class="ee_img tr_noresize" eeimg="1">
 来训练生成器，以努力生成更好的假货。如前所述，Goodfellow 表明这不能提供足够的梯度，尤其是在学习过程的早期。作为解决方案，我们希望最大化 
<img src="https://www.zhihu.com/equation?tex=log(D(G(z)))" alt="log(D(G(z)))" class="ee_img tr_noresize" eeimg="1">
 （_暂时没弄明白为什么这样就能提供足够的梯度_）。在代码中，我们通过以下方式完成此操作：使用鉴别器对第 1 部分的生成器输出进行分类，使用真实标签作为 GT 计算 G 的损失，在反向传递中计算 G 的梯度，最后使用优化器步骤更新 G 的参数。使用真实标签作为损失函数的 GT 标签似乎有违直觉，但这允许我们使用 BCELoss 的 
<img src="https://www.zhihu.com/equation?tex=log(x)" alt="log(x)" class="ee_img tr_noresize" eeimg="1">
 部分（而不是 
<img src="https://www.zhihu.com/equation?tex=log(1-x)" alt="log(1-x)" class="ee_img tr_noresize" eeimg="1">
 部分) 这正是我们想要的。

最后，我们将做一些统计报告，在每个 epoch 结束时，我们将把我们的 fixed_noise 批次推送到生成器，以直观地跟踪 G 的训练进度。报告的训练统计数据为：

- **Loss_D** - 所有真实和所有假批次的损失总和 (
<img src="https://www.zhihu.com/equation?tex=log(D(x)) + log(1 - D(G(z)))" alt="log(D(x)) + log(1 - D(G(z)))" class="ee_img tr_noresize" eeimg="1">
)，即鉴别器损失。
- **Loss_G** - 
<img src="https://www.zhihu.com/equation?tex=log(D(G(z)))" alt="log(D(G(z)))" class="ee_img tr_noresize" eeimg="1">
，即生成器损失。
- **D(x)** - 所有真实批次的鉴别器的平均输出（跨批次）。这应该从接近 1 开始，然后在 G 变得更好时理论上收敛到 0.5。想想这是为什么。(开始时生成器性能极差，鉴别器能很容易鉴别真实批次的图像来自于真实数据，随着生成器性能提升，鉴别器逐渐开始怀疑真实批次的数据，小猴子注)
- **D(G(z))** - 所有假批次的鉴别器的平均输出。第一个数字在 D 更新之前，第二个数字在 D 更新之后。这些数字应该从接近 0 开始，随着 G 变得更好而收敛到 0.5。想想这是为什么。(同理，开始时生成器性能极差，鉴别器能很容易鉴别假批次的图像来自于假数据，随着生成器性能提升，鉴别器逐渐开始认为假批次的数据来自于真实数据，小猴子注)

**注意：**此步骤可能需要一段时间，具体取决于您运行的 epoch 数以及您是否从数据集中删除了一些数据。

```python
# Training Loop

# Lists to keep track of progress
img_list = []
G_losses = []
D_losses = []
iters = 0

print("Starting Training Loop...")
# For each epoch
for epoch in range(num_epochs):
    # For each batch in the dataloader
    for i, data in enumerate(dataloader, 0):

        ############################
        # (1) Update D network: maximize log(D(x)) + log(1 - D(G(z)))
        ###########################
        ## Train with all-real batch
        netD.zero_grad()
        # Format batch
        real_cpu = data[0].to(device)
        b_size = real_cpu.size(0)
        label = torch.full((b_size,), real_label, dtype=torch.float, device=device)
        # Forward pass real batch through D
        output = netD(real_cpu).view(-1)
        # Calculate loss on all-real batch
        errD_real = criterion(output, label)
        # Calculate gradients for D in backward pass
        errD_real.backward()
        D_x = output.mean().item()

        ## Train with all-fake batch
        # Generate batch of latent vectors
        noise = torch.randn(b_size, nz, 1, 1, device=device)
        # Generate fake image batch with G
        fake = netG(noise)
        label.fill_(fake_label)
        # Classify all fake batch with D
        output = netD(fake.detach()).view(-1)
        # Calculate D's loss on the all-fake batch
        errD_fake = criterion(output, label)
        # Calculate the gradients for this batch, accumulated (summed) with previous gradients
        errD_fake.backward()
        D_G_z1 = output.mean().item()
        # Compute error of D as sum over the fake and the real batches
        errD = errD_real + errD_fake
        # Update D
        optimizerD.step()

        ############################
        # (2) Update G network: maximize log(D(G(z)))
        ###########################
        netG.zero_grad()
        label.fill_(real_label)  # fake labels are real for generator cost
        # Since we just updated D, perform another forward pass of all-fake batch through D
        output = netD(fake).view(-1)
        # Calculate G's loss based on this output
        errG = criterion(output, label)
        # Calculate gradients for G
        errG.backward()
        D_G_z2 = output.mean().item()
        # Update G
        optimizerG.step()

        # Output training stats
        if i % 50 == 0:
            print('[%d/%d][%d/%d]\tLoss_D: %.4f\tLoss_G: %.4f\tD(x): %.4f\tD(G(z)): %.4f / %.4f'
                  % (epoch, num_epochs, i, len(dataloader),
                     errD.item(), errG.item(), D_x, D_G_z1, D_G_z2))

        # Save Losses for plotting later
        G_losses.append(errG.item())
        D_losses.append(errD.item())

        # Check how the generator is doing by saving G's output on fixed_noise
        if (iters % 500 == 0) or ((epoch == num_epochs-1) and (i == len(dataloader)-1)):
            with torch.no_grad():
                fake = netG(fixed_noise).detach().cpu()
            img_list.append(vutils.make_grid(fake, padding=2, normalize=True))

        iters += 1
```

Out:

>```python
>Starting Training Loop...
>[0/5][0/1583]   Loss_D: 1.9847  Loss_G: 5.5914  D(x): 0.6004    D(G(z)): 0.6680 / 0.0062
>[0/5][50/1583]  Loss_D: 0.1806  Loss_G: 12.1108 D(x): 0.9140    D(G(z)): 0.0000 / 0.0000
>[0/5][100/1583] Loss_D: 0.8331  Loss_G: 15.9898 D(x): 0.7703    D(G(z)): 0.0000 / 0.0000
>[0/5][150/1583] Loss_D: 0.3900  Loss_G: 8.1397  D(x): 0.9423    D(G(z)): 0.2550 / 0.0013
>[0/5][200/1583] Loss_D: 1.0928  Loss_G: 1.4200  D(x): 0.4597    D(G(z)): 0.0297 / 0.3640
>[0/5][250/1583] Loss_D: 0.6269  Loss_G: 5.7408  D(x): 0.7756    D(G(z)): 0.1923 / 0.0080
>[0/5][300/1583] Loss_D: 0.9402  Loss_G: 6.5511  D(x): 0.5708    D(G(z)): 0.0081 / 0.0075
>[0/5][350/1583] Loss_D: 0.4106  Loss_G: 3.6590  D(x): 0.7936    D(G(z)): 0.0849 / 0.0478
>[0/5][400/1583] Loss_D: 0.7224  Loss_G: 5.1288  D(x): 0.8881    D(G(z)): 0.3856 / 0.0126
>[0/5][450/1583] Loss_D: 0.3661  Loss_G: 3.8855  D(x): 0.8306    D(G(z)): 0.1179 / 0.0376
>[0/5][500/1583] Loss_D: 0.4808  Loss_G: 6.0407  D(x): 0.9085    D(G(z)): 0.2369 / 0.0060
>[0/5][550/1583] Loss_D: 0.4707  Loss_G: 3.1038  D(x): 0.7592    D(G(z)): 0.1002 / 0.0753
>[0/5][600/1583] Loss_D: 0.7048  Loss_G: 8.2070  D(x): 0.9285    D(G(z)): 0.3892 / 0.0012
>[0/5][650/1583] Loss_D: 0.4841  Loss_G: 4.0969  D(x): 0.8490    D(G(z)): 0.2061 / 0.0260
>[0/5][700/1583] Loss_D: 1.6738  Loss_G: 13.9404 D(x): 0.9671    D(G(z)): 0.7496 / 0.0000
>[0/5][750/1583] Loss_D: 0.8728  Loss_G: 7.7513  D(x): 0.9215    D(G(z)): 0.4922 / 0.0012
>[0/5][800/1583] Loss_D: 0.4033  Loss_G: 4.7722  D(x): 0.8287    D(G(z)): 0.1279 / 0.0183
>[0/5][850/1583] Loss_D: 0.8618  Loss_G: 3.2507  D(x): 0.5479    D(G(z)): 0.0231 / 0.0666
>[0/5][900/1583] Loss_D: 1.5095  Loss_G: 1.8737  D(x): 0.3548    D(G(z)): 0.0082 / 0.2237
>[0/5][950/1583] Loss_D: 0.6173  Loss_G: 4.5841  D(x): 0.7906    D(G(z)): 0.2451 / 0.0188
>......
>```

## Results

最后，让我们看看我们做得如何。在这里，我们将查看三种不同的结果。首先，我们将看到 D 和 G 的损失在训练期间是如何变化的。其次，我们将在每个时期的 fixed_noise 批次上可视化 G 的输出。第三，我们将在一批来自 G 的假数据旁边查看一批真实数据。

### Loss versus training iteration

下面是 D和G 的损失与训练迭代的关系图。

```python
plt.figure(figsize=(10,5))
plt.title("Generator and Discriminator Loss During Training")
plt.plot(G_losses,label="G")
plt.plot(D_losses,label="D")
plt.xlabel("iterations")
plt.ylabel("Loss")
plt.legend()
plt.show()
```

> ![](https://gitee.com/Marco-Ray/for-pic-go/raw/master/img/20210609103555.png)

### Visualization of G's progression

记住我们如何在每个训练时期之后将生成器的输出保存在 fixed_noise 批次上。现在，我们可以用动画可视化 G 的训练进程。按播放按钮开始动画。

```python
#%%capture
fig = plt.figure(figsize=(8,8))
plt.axis("off")
ims = [[plt.imshow(np.transpose(i,(1,2,0)), animated=True)] for i in img_list]
ani = animation.ArtistAnimation(fig, ims, interval=1000, repeat_delay=1000, blit=True)

HTML(ani.to_jshtml())
```

> ![](https://gitee.com/Marco-Ray/for-pic-go/raw/master/img/20210609103714.png)

### Real Images vs. Fake Images

最后，让我们一起来看看一些真实图像和假图像。

```python
# Grab a batch of real images from the dataloader
real_batch = next(iter(dataloader))

# Plot the real images
plt.figure(figsize=(15,15))
plt.subplot(1,2,1)
plt.axis("off")
plt.title("Real Images")
plt.imshow(np.transpose(vutils.make_grid(real_batch[0].to(device)[:64], padding=5, normalize=True).cpu(),(1,2,0)))

# Plot the fake images from the last epoch
plt.subplot(1,2,2)
plt.axis("off")
plt.title("Fake Images")
plt.imshow(np.transpose(img_list[-1],(1,2,0)))
plt.show()
```

> ![](https://gitee.com/Marco-Ray/for-pic-go/raw/master/img/20210609105618.png)
>
> ![](https://gitee.com/Marco-Ray/for-pic-go/raw/master/img/20210609105648.png)

## Where to go next

我们已经到了旅程的终点，但是您可以从这里出发去几个地方。你可以：

+ 训练更长时间，看看结果有多好
+ 修改此模型以采用不同的数据集，并可能更改图像的大小和模型架构
+ 查看其他一些很酷的 GAN 项目 [这里](https://github.com/nashory/gans-awesome-applications)
+ 创建生成 [音乐](https://deepmind.com/blog/wavenet-generative-model-raw-audio/) 的 GAN
