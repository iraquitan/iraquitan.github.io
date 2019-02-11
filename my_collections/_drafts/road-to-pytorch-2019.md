---
layout: post
title:  "Road to PyTorch [2019]"
author: iraquitan
date:   2019-02-08 16:32:28 -0300
categories: pytorch deeplearning
---

This is my first post and I intend to share my experience with the PyTorch library so far and also build a learning path for newcomers based on my own learning road. To start with, I'd like to say that the PyTorch own [tutorials][pytorch-tuts] and [documentation][pytorch-docs] are all well written and they helped me a lot.

---

I came from a NumPy background, and I really loved the fact that PyTorch is also a replacement for NumPy to use the power of GPUs, many of the most common functions are ported, but some have different names. It's also possible to alternate from PyTorch tensors to NumPy tensors in a really simple way as shown below.

{% highlight python %}
In [1]: import numpy as np
In [2]: import torch
# numpy tensor
In [3]: a = np.random.randn(3, 5)
In [4]: a.shape
Out[4]: (3, 5)
# torch tensor
In [5]: b = torch.randn(5, 3)
Out[5]: torch.Size([3, 5])
# alternating from numpy to torch tensor
In [6]:  a_torch = torch.from_numpy(a)
In [7]: a_torch.shape
Out[7]: torch.Size([3, 5])
# alternating from torch to numpy tensor
In [8]: b_numpy = b.numpy()
In [9]: b_numpy.shape
Out[9]: (3, 5)
{% endhighlight %}

But for a more in-depth description of what is PyTorch and some of it's capabilities the following tutorial is a good starting point, where you'll learn how to define tensors, some of the operations and how to work with NumPy tensors as well.

[What is PyTorch?][what-is-pytorch]

I also found the following repository that is basically a cheat sheet of PyTorch functions and the NumPy equivalents.

[Pytorch for NumPy Users][pytorch-for-numpy-users]

---

Another thing I really liked about PyTorch is how the data is modeled, handled and processed through the pipeline. This was something that I felt was missing in others libraries and frameworks, and when I understood how it works it is natural and easy to define custom datasets. Basically you have two components, one is the **dataset**, and the other is the **loader**, but you only need to implement the former if you need custom data, because the loader is a PyTorch class that accepts a dataset as argument.

So how does it work? The loader is responsible for iterating the dataset, using batches and a strategy to sample data, usually shuffling the data before iterating, and also using sub-processes to parallelize the process. So it needs to know the **length** of the dataset and **how to get a single item** from it, and that is exactly what you need to implement. PyTorch uses an object-oriented programming approach to this, so you need to define a Python class that inherits from the base `Dataset` class located in the data utilities module (`torch.utils.data`).

The following class defines a custom dataset, from 2 (two) files, *data.pt* and *labels.pt* that should be located in the `root` path. If these files are not stored in the `root` path it throws an error, but if they do, they are loaded with the PyTorch [`load`](https://pytorch.org/docs/stable/torch.html#torch.load) function, in other words, this example expects a file saved with the PyTorch [`save`](https://pytorch.org/docs/stable/torch.html#torch.save) function. In the `__getitem__` method we define how to get a sample and label from the dataset with an index, and apply any data transformation or target transformation to the sample before returning it. This step is very important, because we can define transformations to our data that are applied in running time, this is very useful for data augmentation.

<script src="https://gist.github.com/iraquitan/552b212ae6b5cf27077edcc94bddc861.js"></script>

Now suppose that we want to iterate over our new defined dataset in batches of 4 (four) samples and with the data shuffled. To do so, PyTorch have a data utility class `DataLoader` that get as parameter any class that inherits from the `Dataset` base class, and some other parameters like the batch size, if it should shuffle the data, and also some other parameters for more sophisticated data sampling requirements. The code below do just what I described.

<script src="https://gist.github.com/iraquitan/342587a2d320b2980dba78a26ffd8076.js"></script>

The PyTorch library have many data utilities to help when defining new datasets, like `TensorDataset`, `ConcatDataset`, and `Subset`.

There's also a package in the PyTorch ecosystem called [torchvision][torchvision-docs], that consists of popular datasets, model architectures, and common image transformations for computer vision. And [torchtext][torchtext-docs], that consists of data processing utilities and popular datasets for natural language processing.

The PyTorch tutorial for data loading and processing helped me a lot in learning the PyTorch data pipeline design.

[Data Loading Tutorial][data-loading-tutorial]

---

[pytorch-tuts]: https://pytorch.org/tutorials/
[pytorch-docs]: https://pytorch.org/docs/stable/index.html
[what-is-pytorch]: https://pytorch.org/tutorials/beginner/blitz/tensor_tutorial.html#sphx-glr-beginner-blitz-tensor-tutorial-py
[pytorch-for-numpy-users]: https://github.com/wkentaro/pytorch-for-numpy-users
[torchvision-docs]: https://pytorch.org/docs/stable/torchvision/index.html
[torchtext-docs]: https://torchtext.readthedocs.io/en/latest/index.html
[data-loading-tutorial]: https://pytorch.org/tutorials/beginner/data_loading_tutorial.html
[pytorch-forums]: https://discuss.pytorch.org/
[fast-ai-docs]: https://docs.fast.ai/
[facebook-visdom]: https://github.com/facebookresearch/visdom