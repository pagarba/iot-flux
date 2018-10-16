


# TrigXIOT Portal

The [trigX IOT Portal](https://trigx-iot.com) is your
DIY IoT portal command center. It provides an interfaces to make
interacting with and managing your IOT devices easy. This guide is
all about Do It Yourself [tools for IOT DIY developers](#developer-tools).

**Note:** The Console does not yet work in on IPhones

## Developer DIY Tools

While actively developing an IoT project or product, the Console offers
many helpful features to make prototyping a breeze. See the last time a
device connected, debug a firmware issue by observing event logs,
set up a webhook to send data to an external service, and more.

### Devices

The Devices page allows you to see a list of the devices associated with
your account. Here, you can see specific information about each device,
including it's unique Device ID, it's name, the type of device (i.e.
Photon or Electron) the last time it connected
to the TrigX IOT cloud, and whether or not the device is currently
online.


### Event Logs

The Logs feature provides a clean interface to view event information in real-time, just from your devices. We're hoping that this is handy both while debugging code during development, and checking out recent activity on your device once you power-on your finished project. Tailored around improving the experience of browsing logs, the page provides a handful of tools, like filtering, modifiers which enable you to narrow down your search for events, making it easier to view only the data that is relevant to you. In this view, you'll only see events that come in while the browser window is open.

To visit the page go to [https://trigx-iot.com/events](https://trigx-iot.com/events)


#### Logs

The left side of the page contains a real-time log of events passing through the cloud. You'll get the name, data, timestamp and the device name associated with each event as it comes in. Oh Yeah! And, if you click on the event, you can see the event data.

#### How to publish events

Publishing events can be achieved in multiple ways:
- Using TrigX-IOT API JS's `publishEvent` ([docs](https://docs.trigx-iot.com/reference/javascript/#publishevent))
- Using the Publish event button in the Event Logs page:

#### Filtering the events

Filters let you narrow down your search and only see events that are relevant.

You can filter the events by writing anything in the input. Your query will be compared with the event name, data, publisher, and date.
<

#### Modifiers

Besides writing in the input, you can use modifiers to narrow down your search even further. You can see the list of modifiers by pressing the Advanced button.

- `device` Filter by device ID (example: `device:34003d001647353236343012`). The `device` modifier is not usable when viewing a device's individual page, as the stream is already listening only for events coming from that device.
- `event` Filter by event name (example: `event:status`)
- `range` Only show events that have a number value between min and max (`range:min-max`, example: `range:20-100`)
- `data` Filter by data (example: `data:device-is-ok`)

Modifiers can be grouped: `device:34003d001647353236343012 event:temperature range:30-50`

** Note: Having multiple modifiers of the same type is not yet supported (you can not filter by 2 device IDs) **

You can combine modifiers with a query. In this example, we combine the query '35' with the modifier 'event:temperature'. The page will only show events named `temperature` that have `35` as their data.

#### Viewing event data

To view more details about an event, click on it. If the event data is a valid JSON string, it will be displayed in a way that makes it easier to read and understand.



To view the raw version of the JSON, click on the `RAW` button.


You can copy the data to the clipboard if you click on the copy button.

** Note: You can also navigate through the event list by using the up and down arrow keys **

#### Clearing the event logs

You can empty the list of received events by pressing on the Clear button.

#### Pausing the event stream

If lots of events are coming through, you can put events in a queue by clicking on the Pause button. This should help you navigate through the list of events that you have already received.

To make the events from the queue visible click on the Play button.



### Integrations

Integrations allow you to send data from your DIY IOT devices to
external tools and services. The Console provides an interface to
create, view, edit, and delete your IOT integrations.


class="full-width"/>

For more information on how to start using integrations, you should
check out:

- [Webhooks
guide](/guide/tools-and-features/webhooks/)
- [Webhooks
tutorial](/tutorials/integrations/webhooks/)
- [Azure IoT Hub
tutorial](/tutorials/integrations/azure-iot-hub/)
- [Google Cloud Platform
tutorial](/tutorials/integrations/google-cloud-platform/)

### Billing
- TODO

## Channels

For many using TrigXIOT Portal, the end-goal is to move from a single prototype
to a professional deployment of thousands or millions of units in the
field. When you begin making this transition to managing a larger fleet
of devices, you'll find yourself asking questions like:

- _How many_ of my devices are online right now?
- _Which_ firmware version is running on each device?
- _Who_ of my customers are using their devices, and who isn't?
- _Who_ in my company has access to this fleet, and what information can they
access?

This is where creating a TrigX IOT DIY application Channel  is vital to ensure scaling can
happen seamlessly and successfully.


The first step to get started is understanding the differences between your
personal devices and those added to a Channel for messaging purposes

### Devices vs Channels

When you create a **Channle**, you'll have a few additional important concepts available to you: **devices**, **team members** and **customers**.

First, you'll set up a **Product**, the overarching group responsible for the
development of your Internet of Things products.

Defining a Product is what unifies a group of homogeneous devices together, and your Product can be configured to function exactly how you
envision.

Each Product has its own fleet of associated **devices**. Any hardware
on the Particle Device Cloud including the PØ, P1,
Photon, and Electron, could be used inside a Product, but it's important to note that only one type of device will be in each Product

**Customers** own a device, and have permissions to control
their device. You will define the extent of their access to the device when you
configure your Product.

Your Product also has **team members** with access to the Console.

It is important to note that *team members* and *customers* have different levels of access. For instance, only *team members* will typically be able to send an over-the-air firmware update, while *customers* may have the ability to control their own product. These access levels will be controlled through the Console.

### Adding team members

Now that you have created a Product successfully, it's time to add your coworkers and friends that are collaborating with you on your IoT product. Adding a team member will give them full access to your Product's Console.



Clicking this button will open up a modal where you can invite a team member by email address. Before inviting a new team member, **make sure that they already have a Particle account with the email address you will be using to invite them to the Product**. 

Once your team member is successfully invited, they will receive an email notifying them of their invitation. The next time they log into their Console, they will have the option of accepting or declining the invitation. Remember that you can have up to 5 team members in the free Prototype tier, so go send some invites!

Nice! Now you have a Product with a team.

### Your Channle ID

When you created your channle, a unique numeric ID was assigned to it. This small piece of information is *very, very important* to you as a product creator, and it will be used countless times during the development and manufacturing process for your product. You will be able to find your product's ID at any time in the navigation bar when viewing information about your product:


This ID will be used by the TrigxIOT Device Cloud to identify which devices belong to your Product, and subsequently it is part of what empowers you to manage firmware running on those devices *en masse*.

When working with devices that belong to your Product, it is important to note that this product ID must be compiled into the firmware that is running on each device. The product ID that the device reports to the cloud from its firmware will determine which Product it requests to become a part of. This will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

### Adding Devices

Now that you have your Channel, it's time to import devices. Importing devices will assign them to your Product and allow you to start viewing and managing these devices within your Product Console.

For any product you may be developing, you likely have one or more Particle development kits (i.e. a Photon) that you have been using internally for prototyping purposes. We strongly recommend importing these devices into your Product, and using them as your *development group*.

In addition, you'll want to have a *test group* of devices to serve as the guinea pigs for new versions of product firmware. You should get into the habit of uploading a new version of firmware to your product, and flashing it to your test group to ensure your code is working as expected. This too will be covered more in-depth in the [rollout firmware](#rollout-firmware) section below.

To import devices, click on the Devices icon in your product sidebar, then click on the "Import" button.

![Your product's devices](/assets/images/devices-page.png)

To allow you to import devices in bulk, we allow you to upload a file containing multiple device IDs. Create a `.txt` file that contains all of the IDs of devices that you would like to import into your product, one on each line. [Not sure what your device ID is?](/photon/cli/#running-from-source-advanced-particle-identify) *You cannot register devices that have already been 'claimed' by someone outside of your team; all of these devices must either belong to a team member or belong to no one*. The file should look something like this:

```
55ff6d04498b49XXXXXXXXXX
45f96d06492949XXXXXXXXXX
35ee6d064989a9XXXXXXXXXX
```

Where each line is one Device ID. Once you have your file ready, drop it onto the file selector in the import devices dialog box.


#### Events

An event is any single outbound message from your fleet that exits the
TrigXIOT  Device Cloud. 

If you have multiple JS applications subscribed to an event then each will consume one of your outbound messages with each published event- watch out for running many copies of your app!

When you hit the outbound event limit you can choose to upgrade to the new tier or stay at the current tier. If you do choose to stay with the current tier then any future events that month won’t be sent. You’ll get a fresh batch of events at the beginning of the next month, and normal behavior will resume then. Don’t worry, we’ll send you a warning before and an alert when you reach the event limit. 

#### Team Members

Team members are people that you’ve added to a Product to give them administrative access to the data, controlling firmware on devices, adding integrations, and more. The product owner can add and remove team members as necessary, but they’ll need to have a TrigxIOT account before they can be invited to join your team.


### Configuring Your Channels
