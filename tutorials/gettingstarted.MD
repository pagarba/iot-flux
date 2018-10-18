# Getting Started with TrigX-IOT Portal


![alt text](/assets/images/blocksafe.png)

## Set up MQTT on a Raspberry Pi 

In this Tutorial we will : 

- Install Raspbian Strech Lite on headless Raspberry Pi 3 Model B
- Set up WiFi on Raspberry Pi
- Install Mosquitto (MQTT Server) on Raspberry Pi
- Register Devices & Channles on the TrigXIOT platform
- Connect Raspberry Pi with TrigX IOT Platform


### Quick install

## What You'll Need
In order to connect your Raspberry Pi to the TrigX-IOT Portal,  you'll need the following things.

- Raspberry Pi (Raspberry Pi v2 and v3 preferred)
- Power supply (5V, 2A+ preferred)
- Micro SD card and SD adapter
- Ethernet cable (for wired connections)

![alt text](/assets/images/rasppi3-1.jpg)

If you do not have access to a wired network cable, you will need to connect your Pi to an active Wi-Fi network, which will require the following:

- Keyboard
- Mouse
- Monitor
- HDMI Cable (to connect the Pi to your monitor)

## Download and install Raspbian
Before you boot up your Pi for the first time, you'll need to make sure you have the latest Raspbian image from the Raspberry Pi Foundation. Note that flashing a fresh version of Raspbian Jessie with Pixel (GUI) can take as long as 10-15 minutes.

Do you already have a Pi with Raspbian installed? Skip the Setup below.

### I don't have an SD card with Raspbian

If you don't already have an SD card with Raspbian on it, you'll need to follow these steps:

1. Make sure your SD card is FAT32 formatted  
2. Install an operating system image on the SD card. We recommend Raspberry Pi's preferred operating system, Raspbian Jessie with Pixel, which you can download [here](https://www.raspberrypi.org/downloads/raspbian/).  
3. Install the operating system onto your SD card by following the Raspberry Pi Foundation's official installation instructions, [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).  

<p class = "boxed">
**Note**: There are many different tools and resources available on the Internet to make the process of burning a new image for your Raspberry Pi easier. If you have issues with the instructions above from the Raspberry Pi Foundation, [elinux.org](http://elinux.org/RPi_Easy_SD_Card_Setup#SD_card_setup) has compiled a great list of alternatives for Mac, Windows, and Linux.  

  - [Mac setup options](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_card_using_Mac_OS_X)  
  - [Windows setup options](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Windows)  
  - [Linux setup options](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Linux_.28including_on_a_Raspberry_Pi.21.29)  

</p>


4\. Insert the SD card into your Raspberry Pi, and apply power using a 5V, 2A+ power supply.

### I have an SD card with Raspbian

If you already have a Pi set up, run the following commands from your Raspberry Pi's command line to update your OS to the most recent version of Raspbian:

1. `sudo apt-get update`, which will update your local package database with the upstream one.
2. `sudo apt-get upgrade`, which will actually upgrade your Raspbian image to the most recent from the Raspberry Pi Foundation.

Note that these steps may take **up to 10 minutes** to complete, so please have patience.

## Connect your Pi to the Internet

There are two primary ways to connect your Raspberry Pi to the web--using a wired connection (Ethernet) or using a wireless connection (Wi-Fi preferred).

### Connecting with a wired connection (Ethernet)

If your Raspberry Pi has an Ethernet port, connecting it to the Internet is as simple as plugging in a cable to the on-board RJ-45 jack on your Pi. The operating system should automatically work with your router to obtain an IP address and connect to the web.

You'll also want to add a blank file named `ssh` (open a text editor and hit Save as: `ssh`) to the `boot` drive of the SD card to allow connecting to your Raspberry Pi remotely.

**Note**: The Pi Zero does not have an on-board Ethernet port, but can be connected with a Ethernet --> USB adapter.

### Connecting over Wi-Fi (headless setup)

You can put the Wi-Fi connection information to the SD card before starting the Raspberry Pi if you don't want to connect a monitor and keyboard.

1. Insert the SD card into your computer.
2. Open the drive called `boot`
3. Add a file named `wpa_supplicant.conf` with this content:

  ```
  network={
      ssid="YOUR_SSID"
      psk="YOUR_PASSWORD"
      key_mgmt=WPA-PSK
  }
  ```

4. Add a blank file named `ssh` (open a text editor and hit Save as: `ssh`).
5. Insert the SD card into your Raspberry Pi.

### Connecting over Wi-Fi (GUI setup)

1. Connect a USB keyboard, USB mouse and monitor to your Raspberry Pi.
2. Click on the icon on the left of the volume symbol to scan for Wi-Fi networks and start the Wi-Fi configuration process.

  ![](/assets/images/raspberry-pi-wifi-ssid.png)

3. Enter your network's Wi-Fi password.

  ![](/assets/images/raspberry-pi-wifi-password.png)

4. When your Pi has successfully connected to the Wi-Fi network, you will see a blue Wi-Fi icon next to the volume icon at the top right hand corner of your screen.

  ![](/assets/images/raspberry-pi-wifi-connected.png)

Note that it's also possible to obtain the IP Address of your Raspberry Pi after you've connected it to the Internet. To do so, click on the black terminal icon at the top left hand side of your screen, and type `ifconfig wlan0`.

Your Pi's IP Address should be displayed next to the label, `inet addr` and look something like `192.168.X.XXX`.

![](/assets/images/raspberry-pi-ip-address.png)



### Instructions for headless setup
Note that if you are using a wired connection without a monitor and keyboard (headless) you will have to SSH (secure shell) into your Pi in order to install the software. If you are using a keyboard and monitor, you can head directly to 

- The first step is to obtain the IP address for your Raspberry Pi once it is connected to the Internet. You can find instructions for obtaining your Pi's IP address using Raspberry Pi's official tutorial, [here](https://www.raspberrypi.org/documentation/remote-access/ip-address.md).

The easiest method find your Raspberry Pi's IP address and SSH into it is to use its mDNS hostname followed by `.local`. The default hostname for your Pi is `raspberrypi`, so on macOS and Linux, you can simply SSH into your Pi by running the following command in your computer's terminal:
```
ssh pi@raspberrypi.local
```
- If you are using Windows, you can download and use [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) to SSH into your Pi.

The default password for Raspberry Pi is `raspberry`. **We strongly recommend you change the default password.** You can do so by running the following command inside of your Raspberry Pi's terminal:
```
passwd
```
If your want to change the hostname of your Raspberry Pi to something more meaningful, or if you have multiple Raspberry Pi's on your network, you can do so by running the following command inside of your Pi's terminal:

```
echo newHostname | sudo tee /etc/hostname
```
- You will need to reboot your Pi for the new hostname to be used.



<p class = "boxed">
An alternate method for finding the IP address in a headless setup configuration is to ensure that your computer is connected to the same network as your Raspberry Pi device, and to run the following command in your computer's terminal:  

<br>

```arp -a | grep b8:27:eb | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'```  
<br>

As it turns out, the Raspberry Pi Foundation has their own range of MAC addresses all to themselves. The command above will scan your network for devices whose MAC address starts with the prefix, `b8:27:eb` and report their IP address. Assuming you only have one Raspberry Pi connected to the network, you should be able to easily identify your Pi's network address and SSH into it in the next step.  
<br>

- Once you have your Pi's IP address, you can connect to your Pi through a secure shell (SSH). If you are using macOS or Linux, you can simply create an SSH tunnel using your `Terminal` application. If you are using Windows, download [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).
<br><br>
- SSH into your Pi using the following command, where `192.168.X.XXX` is the IP address of your Pi.
<br>
```
ssh pi@192.168.X.XXX
```
</p>


 


### Install Raspbian

- If this is the first time you’re using Raspberry Pi
- we must install operating system on it
- Since we will use headless (without monitor) Raspberry Pi, minimal-lite version of Raspbian will be sufficient
- Download Raspbian Strech Lite and download Etcher
- Put microSD card in your PC and run Etcher.

- Choose Raspbian image (you don’t need to unpack it), choose drive where is your microSD card and click Flash!


### Setup Raspbian

- We must connect PC to Raspberry Pi and connect Pi to WiFi
- For this task, both our PC and Raspberry Pi must connect on the same WiFi network
- While your microSD card is in your PC
- create two files in it’s root:
     - wpa_supplicant.conf
     - ssh

- In wpa_supplicant.conf enter this text and edit your details: 
     - country code
     - WiFi name
     - password
     
   ``` 
       country=US
       ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
       update_config=1
       network={
        ssid="WiFiNetworkName"
        psk="WiFiPassword"
        key_mgmt=WPA-PSK
       } 
       
    ```
       

  - File with namessh 
    - should remain empty and without any extension
          
          
 - Eject the microSD card from your computer and insert it into your Raspberry Pi
 - Power up your Pi and after a few moments your Pi should be up and connected to WiFi  
 - But we don’t see that until we connect from PC to Raspberry Pi
 - For that, we must find out local IP address of Raspberry Pi
    - find out the local IP address of your PC by using ipconfig
    - log into your router and scan devices
     - usually ipv4 info
      
 - On your computer, open up PuTTY and connect to IP address of Pi
      - Login as pi 
      - password raspberry
      
### Install MQTT on rasperry

 - MQTT is a machine-to-machine messaging protocol
 - It's designed to provide lightweight publish/subscribe communication to “Internet of Things” devices
 
  - Install MQTT on Raspbery Pi with this command:
 
     ``` 
      sudo apt-get install mosquitto mosquitto-clients 
     ```
   
  - Test it with two SSH connections to Pi
  
  - In one window we will subscribe to messages on “test/topic” channel:

      ```
      mosquitto_sub -v -t "test/topic"  
      ```
    
  - In the other window  publish messages on same chanell:

       ```
       mosquitto_pub -t "test/topic" -m "Hello, TrigX IOT World!"
       
       ```

 - Messages published in one terminal window will pop up on other one
 - These messages are exchanging on localhost of Raspberry Pi now 
     - goal is for these messages to be sent to TrigX IOT platform in cloud
     
### Create & Register Devices

 - You can  create users, channels and Devices on the TrigXIOT Dasboard
    - We will register over dashboard
    - Create two devices 
        - named 
           - Cool-IOT-Device-1
           - Cool-IOT-Device-2
    - Create a Channel 
        - named 
           - Cool-IOT-Channel-1 
    - Connect these devices to the channel


## Development Resources

Great work so far! In case you ever find yourself in a pickle, here's a list of resources that can help you through the next steps of your journey. 

#### Technical Documentation
- [Raspberry Pi Pinout and Datasheet](/datasheets/raspberrypi-datasheet/)

#### Projects and Examples
- [Raspberry Pi tutorials](/guide/getting-started/examples/raspberry-pi/)

#### Forums and Support
- [Raspberry Pi Official Documentation](https://www.raspberrypi.org/documentation/)
- [TrigX-IOT Support Portal](http://support.trigx-iot.com)

