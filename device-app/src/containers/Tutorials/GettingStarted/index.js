import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  dashboard: {
    fontFamily: "Nudista",
  },
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.dashboard}>
        <h1>Getting Started with TrigX-IOT Portal</h1>

        <p>
          <img alt="alt text" src="https://github.com/pagarba/iot-flux/raw/master/assets/images/blocksafe.png"/>
        </p>

        <h2>Set up MQTT on a Raspberry Pi</h2>

        <p>In this Tutorial we will : </p>

        <ul>
          <li>Install Raspbian Strech Lite on headless Raspberry Pi 3 Model B</li>
          <li>Set up WiFi on Raspberry Pi</li>
          <li>Install Mosquitto (MQTT Server) on Raspberry Pi</li>
          <li>Register Devices &amp; Channles on the TrigXIOT platform</li>
          <li>Connect Raspberry Pi with TrigX IOT Platform</li>
        </ul>

        <h3>Quick install</h3>

        <h2>What You'll Need</h2>

        <p>In order to connect your Raspberry Pi to the TrigX-IOT Portal,  you'll need the following things.</p>

        <ul>
          <li>Raspberry Pi (Raspberry Pi v2 and v3 preferred)</li>
          <li>Power supply (5V, 2A+ preferred)</li>
          <li>Micro SD card and SD adapter</li>
          <li>Ethernet cable (for wired connections)</li>
        </ul>

        <p>
          <img alt="alt text" src="https://github.com/pagarba/iot-flux/raw/master/assets/images/rasppi3-1.jpg"/>
        </p>

        <p>If you do not have access to a wired network cable, you will need to connect your Pi to an active Wi-Fi network, which will require the following:</p>

        <ul>
          <li>Keyboard</li>
          <li>Mouse</li>
          <li>Monitor</li>
          <li>HDMI Cable (to connect the Pi to your monitor)</li>
        </ul>

        <h2>Download and install Raspbian</h2>

        <p>Before you boot up your Pi for the first time, you'll need to make sure you have the latest Raspbian image from the Raspberry Pi Foundation. Note that flashing a fresh version of Raspbian Jessie with Pixel (GUI) can take as long as 10-15 minutes.</p>

        <p>Do you already have a Pi with Raspbian installed? Skip the Setup below.</p>

        <h3>I don't have an SD card with Raspbian</h3>

        <p>If you don't already have an SD card with Raspbian on it, you'll need to follow these steps:</p>

        <ol>
          <li>Make sure your SD card is FAT32 formatted  </li>
          <li>Install an operating system image on the SD card. We recommend Raspberry Pi's preferred operating system, Raspbian Jessie with Pixel, which you can download <a href="https://www.raspberrypi.org/downloads/raspbian/">here</a>.  </li>
          <li>Install the operating system onto your SD card by following the Raspberry Pi Foundation's official installation instructions, <a href="https://www.raspberrypi.org/documentation/installation/installing-images/README.md">here</a>.  </li>
        </ol>

        <p><strong>Note</strong>: There are many different tools and resources available on the Internet to make the process of burning a new image for your Raspberry Pi easier. If you have issues with the instructions above from the Raspberry Pi Foundation, <a href="http://elinux.org/RPi_Easy_SD_Card_Setup#SD_card_setup">elinux.org</a> has compiled a great list of alternatives for Mac, Windows, and Linux.  </p>

        <ul>
          <li><a href="http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_card_using_Mac_OS_X">Mac setup options</a>  </li>
          <li><a href="http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Windows">Windows setup options</a>  </li>
          <li><a href="http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Linux_.28including_on_a_Raspberry_Pi.21.29">Linux setup options</a>  </li>
        </ul>

        <p>4. Insert the SD card into your Raspberry Pi, and apply power using a 5V, 2A+ power supply.</p>

        <h3>I have an SD card with Raspbian</h3>

        <p>If you already have a Pi set up, run the following commands from your Raspberry Pi's command line to update your OS to the most recent version of Raspbian:</p>

        <ol>
          <li><code>sudo apt-get update</code>, which will update your local package database with the upstream one.</li>
          <li><code>sudo apt-get upgrade</code>, which will actually upgrade your Raspbian image to the most recent from the Raspberry Pi Foundation.</li>
        </ol>

        <p>Note that these steps may take <strong>up to 10 minutes</strong> to complete, so please have patience.</p>

        <h2>Connect your Pi to the Internet</h2>

        <p>There are two primary ways to connect your Raspberry Pi to the web--using a wired connection (Ethernet) or using a wireless connection (Wi-Fi preferred).</p>

        <h3>Connecting with a wired connection (Ethernet)</h3>

        <p>If your Raspberry Pi has an Ethernet port, connecting it to the Internet is as simple as plugging in a cable to the on-board RJ-45 jack on your Pi. The operating system should automatically work with your router to obtain an IP address and connect to the web.</p>

        <p>You'll also want to add a blank file named <code>ssh</code> (open a text editor and hit Save as: <code>ssh</code>) to the <code>boot</code> drive of the SD card to allow connecting to your Raspberry Pi remotely.</p>

        <p><strong>Note</strong>: The Pi Zero does not have an on-board Ethernet port, but can be connected with a Ethernet --&gt; USB adapter.</p>

        <h3>Connecting over Wi-Fi (headless setup)</h3>

        <p>You can put the Wi-Fi connection information to the SD card before starting the Raspberry Pi if you don't want to connect a monitor and keyboard.</p>

        <ol>
          <li>Insert the SD card into your computer.</li>
          <li>Open the drive called <code>boot</code></li>
          <li>
            <p>Add a file named <code>wpa_supplicant.conf</code> with this content:</p>
            <p>
              <code>
                <p>country=US</p>
                <p>ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev</p>
                <p>update_config=1</p>
                <p>network=&#123;</p>
                <p>&emsp;ssid="WiFiNetworkName"</p>
                <p>&emsp;psk="WiFiPassword"</p>
                <p>&emsp;key_mgmt=WPA-PSK</p>
                <p>&#125;</p>
              </code>
            </p>
          </li>
          <li><p>Add a blank file named <code>ssh</code> (open a text editor and hit Save as: <code>ssh</code>).</p></li>
          <li>Insert the SD card into your Raspberry Pi.</li>
        </ol>

        <h3>Connecting over Wi-Fi (GUI setup)</h3>

        <ol>
          <li><p>Connect a USB keyboard, USB mouse and monitor to your Raspberry Pi.</p></li>
          <li><p>Click on the icon on the left of the volume symbol to scan for Wi-Fi networks and start the Wi-Fi configuration process.</p></li>
          <li><p>Enter your network's Wi-Fi password.</p></li>
          <li><p>When your Pi has successfully connected to the Wi-Fi network, you will see a blue Wi-Fi icon next to the volume icon at the top right hand corner of your screen.</p></li>
        </ol>

        <p>Note that it's also possible to obtain the IP Address of your Raspberry Pi after you've connected it to the Internet. To do so, click on the black terminal icon at the top left hand side of your screen, and type <code>ifconfig wlan0</code>.</p>

        <p>Your Pi's IP Address should be displayed next to the label, <code>inet addr</code> and look something like <code>192.168.X.XXX</code>.</p>

        <h3>Instructions for headless setup</h3>

        <p>Note that if you are using a wired connection without a monitor and keyboard (headless) you will have to SSH (secure shell) into your Pi in order to install the software. If you are using a keyboard and monitor, you can head directly to </p>

        <ul>
          <li>The first step is to obtain the IP address for your Raspberry Pi once it is connected to the Internet. You can find instructions for obtaining your Pi's IP address using Raspberry Pi's official tutorial, <a href="https://www.raspberrypi.org/documentation/remote-access/ip-address.md">here</a>.</li>
        </ul>

        <p>
          The easiest method find your Raspberry Pi's IP address and SSH into it is to use its mDNS hostname followed by <code>.local</code>. The default hostname for your Pi is <code>raspberrypi</code>, so on macOS and Linux, you can simply SSH into your Pi by running the following command in your computer's terminal:
          <code>
            ssh pi@raspberrypi.local
          </code>
          - If you are using Windows, you can download and use <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html">PuTTY</a> to SSH into your Pi.
        </p>

        <p>The default password for Raspberry Pi is <code>raspberry</code>. <strong>We strongly recommend you change the default password.</strong> You can do so by running the following command inside of your Raspberry Pi's terminal:<code>passwd</code>If your want to change the hostname of your Raspberry Pi to something more meaningful, or if you have multiple Raspberry Pi's on your network, you can do so by running the following command inside of your Pi's terminal:</p>

        <p><code>echo newHostname | sudo tee /etc/hostname</code>- You will need to reboot your Pi for the new hostname to be used.</p>

        <p>An alternate method for finding the IP address in a headless setup configuration is to ensure that your computer is connected to the same network as your Raspberry Pi device, and to run the following command in your computer's terminal:</p>

        <p><code>arp -a | grep b8:27:eb | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'</code><br/>&lt;br&gt;</p>

        <p>As it turns out, the Raspberry Pi Foundation has their own range of MAC addresses all to themselves. The command above will scan your network for devices whose MAC address starts with the prefix, <code>b8:27:eb</code> and report their IP address. Assuming you only have one Raspberry Pi connected to the network, you should be able to easily identify your Pi's network address and SSH into it in the next step.<br/>&lt;br&gt;</p>

        <ul>
          <li>Once you have your Pi's IP address, you can connect to your Pi through a secure shell (SSH). If you are using macOS or Linux, you can simply create an SSH tunnel using your <code>Terminal</code> application. If you are using Windows, download <a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html">PuTTY</a>.&lt;br&gt;&lt;br&gt;</li>
          <li>SSH into your Pi using the following command, where <code>192.168.X.XXX</code> is the IP address of your Pi.&lt;br&gt;<code>ssh pi@192.168.X.XXX</code>&lt;/p&gt;</li>
        </ul>

        <h3>Install MQTT on rasperry</h3>

        <ul>
          <li>MQTT is a machine-to-machine messaging protocol</li>
          <li>
            <p>It's designed to provide lightweight publish/subscribe communication to “Internet of Things” devices</p>
            <ul>
              <li>
                <p>Install MQTT on Raspbery Pi with this command:</p>
                <p><code>sudo apt-get install mosquitto mosquitto-clients</code></p>
              </li>
              <li><p>Test it with two SSH connections to Pi</p></li>
              <li>
                <p>In one window we will subscribe to messages on “test/topic” channel:</p>
                <p><code>mosquitto_sub -v -t "test/topic"</code></p>
              </li>
              <li>
                <p>In the other window  publish messages on same chanell:</p>
                <p>` mosquitto_pub -t "test/topic" -m "Hello, TrigX IOT World!"</p>
              </li>
            </ul>
          </li>
          <li><p>Messages published in one terminal window will pop up on other one</p></li>
          <li>
            These messages are exchanging on localhost of Raspberry Pi now
            <ul>
              <li>goal is for these messages to be sent to TrigX IOT platform in cloud</li>
            </ul>
          </li>
        </ul>

        <h3>Create &amp; Register Devices</h3>

        <ul>
          <li>You can  create users, channels and Devices on the TrigXIOT Dasboard
            <ul>
              <li>We will register over dashboard</li>
              <li>
                Create two devices
                <ul>
                  <li>
                    named
                    <ul>
                      <li>Cool-IOT-Device-1</li>
                      <li>Cool-IOT-Device-2</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Create a Channel
                <ul>
                  <li>
                    named
                    <ul>
                      <li>Cool-IOT-Channel-1 </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Connect these devices to the channel</li>
            </ul>
          </li>
        </ul>

        <h2>Development Resources</h2>

        <p>Great work so far! In case you ever find yourself in a pickle, here's a list of resources that can help you through the next steps of your journey. </p>

        <h4>Technical Documentation</h4>

        <ul>
          <li><a href="https://github.com/pagarba/iot-flux/blob/master/datasheets/raspberrypi-datasheet">Raspberry Pi Pinout and Datasheet</a></li>
        </ul>

        <h4>Projects and Examples</h4>

        <ul>
          <li><a href="https://github.com/pagarba/iot-flux/blob/master/guide/getting-started/examples/raspberry-pi">Raspberry Pi tutorials</a></li>
        </ul>

        <h4>Forums and Support</h4>

        <ul>
          <li><a href="https://www.raspberrypi.org/documentation/">Raspberry Pi Official Documentation</a></li>
          <li><a href="http://support.trigx-iot.com">TrigX-IOT Support Portal</a></li>
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
