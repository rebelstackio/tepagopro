# Pull Request Deploy System

With the file `travis.provision.sh` will be possible to build and deploy a pull request into S3 buckets. For testing purpose there is also a vagrant box where you can test the file without create pull request in your repo.

## Get Started

Create a `.env` file in your `vagrant` folder with your AWS keys. You can follow the format in the file [.env.sample](./.env.sample)

Once the aws key are ready you can start the process with:

```sh
vagrant up
```

This will create the vagrant box and use the provision script to simulate the travis builds


To recreate the build you can run
```sh
vagrant provison
```
