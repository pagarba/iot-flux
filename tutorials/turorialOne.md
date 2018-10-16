
 
# TrigXIOT Portal -  Connect your Rasperry Pi to TrigX IOT

## Setting up MQTT on a headless Raspberry Pi and connecting it to TrigX IOT platform

In this Tutorial we will : 

- Install Raspbian Strech Lite on headless Raspberry Pi 3 Model B
- Set up WiFi on Raspberry Pi
- Install Mosquitto (MQTT Server) on Raspberry Pi
- Register Devices & Channles on the TrigXIOT platform
- Connect Raspberry Pi with TrigX IOT Platform


*** To follow this tutorial you will need a computer, Raspberry Pi (I have RPi 3 Model B), microSD card and WiFi connection.

**Note:** The Console does not yet work on IPhones

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
          - should remain empty and without any extension.

      - Eject the microSD card from your computer and insert it into your Raspberry Pi
      - Power up your Pi and after a few moments your Pi should be up and connected to WiFi
      - But we don’t see that until we connect from PC to Raspberry Pi
      - For that, we must find out local IP address of Raspberry Pi
      - One way to find that is to log into your router and find attached devices
      - Another way is to first find out the local IP address of your PC
      - or use ipconfig

