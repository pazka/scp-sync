# scp-sync
Tool for syncing your progress on some remote machine through scp, while trying to overcome some of the limitation of scp.

# Why 
This tool is made specificaly for the case where you have an ssh jumped/tunneled connection from one machine to some other remote without a constant environnement ( Windows -> Windows -> Linux for example) and thus not acces to fancy tools like rsync or WinSCP. 

The goal is to be able to launch the tool, and develop without thinking of transferring the files to your host for testing. 

# Limitations

### Scale
Since it only work with ssh and scp, it's not made for huge data transfert, it's more of a send the change you've made to a file while developping a small to moderate sized project. 

[TBD]

# Planned

[TBD]
