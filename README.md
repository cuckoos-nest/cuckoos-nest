# Cuckoo's Nest
A fun and likable app for mimicking images

## Overview
![Homepage](http://eliran.net/cuckoo-images/main.png) 
![Search](http://eliran.net/cuckoo-images/search.png) 
![Category](http://eliran.net/cuckoo-images/category.png) 
![Profile](http://eliran.net/cuckoo-images/profile.png)

Cuckoo's Nest is an Ionic based mobile app that lets you picture yourself mimicing funny photos, and share the results with your friends.

## Project Goal
We were trying to create a nice app we thought people would like, but it turns out we don't have enough time to finish the project, and the bugs and feature suggestions just kept stacking before our eyes.

So eventually, we decided to open this project to the open-source community. 

I really hope the text below and the [issues page](https://github.com/cuckoos-nest/cuckoos-nest/issues) will help you to get into this project and help us create a nice app out of it.

## Node version
This project uses Ionic 3 and Node v8.6.0, for best results, you probably want to use the same Node version too. (You may use nvm to be able to run multiple Node versions on the save enviorment)

## Installation
- Install Node
- Install Ionic 3, by running: `$ npm i -g ionic`
- Clone the project and go to the project's directory
- Run `$ npm i` to install all the dependencies
- Run `$ ionic serve` to run the project, and navigate your browser to: http://localhost:8100
- Now, you probably want to enter Chrome's developer mode and simulate mobile resolution.

## Software Design
### Tech
The client side is developed using Ionic 3, for both Android and iOS. 

We use Firebase as the server side. The Firebase configuration can be found in [firebase-conf](https://github.com/cuckoos-nest/firebase-conf).

We communicate with Firebase using [AngularFire2](https://github.com/angular/angularfire2).

### Login
For now, we only accept logins via Facebook. This may change in the near future.

The Facebook application is public, so feel free to login.

### Pages
#### Wall (src/pages/wall)
The wall is the main page of the application. Over time, it fills up with content from users and categories you follow.
Can also be reached from the bottom menu, by pressing the home icon.

#### Categories (src/pages/categories)
A list of all the available categories.
Can be reached by pressing the `+` icon in the bottom menu.

#### Category (src/pages/category)
Lists all of the available photos in a certain category.
Can be reached from the Categories page.

#### Comments (src/pages/comments)
Lists comments form a certain post.
Can be reached by pressing "Comment" on a post. (From example, from the Wall page)

#### Edit Upload (src/pages/edit-upload)
After a user shoots a photo, he can view it and add a short description before it's been uploaded. This page is the preview page.

#### Fullscreen Image (src/pages/image-viewer)
Can be reached by pressing an image in a post.

#### Notifications (src/pages/notifications)
Can be reached by pressing the heart icon in the bottom menu.
Everytime a user likes or comments on one of your posts, a notification will be shown in this page. (There's also a badge)

#### Photo (src/pages/photo)
Can be reached by pressing a photo anywhere in the application. For example, in the Category page.

It contains a list of users who mimiced this photo, and a button that enables you to mimic it yourself.

##### Search (src/pages/search)
Can be reached by pressing the little magnifying glass icon in the bottom menu.
Using this page, you may filter photos by name and a category, or serach for members.

### Profile (src/pages/user)
Can be reached by pressing a user anywhere in the app, or by pressing on the little person icon in the right side of the bottom menu.
It has a list of all the mimics a user had, and some more info about the user.

### Webcam (src/pages/webcam)
The webcam page can be reached from the Photo page. The only purpose of the page is to be a "polyfill" in the web, because in the mobile version we're using the native camera view.

## Contributing
[Check for open issues](https://github.com/cuckoos-nest/cuckoos-nest/issues) or add your own features by starting a pull request.

If you need access to the Facebook application or Firebase account for contribution needs, let us know and we will work something out.

Feel free to contact us on: eliran013@gmail.com 