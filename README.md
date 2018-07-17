## Hydro Blunder
Hydro Blunder (a play on the popular boat racing game "Hydro Thuner") is a game where you control a boat and dodge obstacles.

## Motivation
The motivation behind Hydro Blunder was simply because we both wanted to try making a game. After a few minutes of brainstorming, Hydro Blunder was what we decided on.

## Build status
This repo is no longer being worked on. It was done by John York and Ryan Farney as a one week paired programming project. They are thinking about collaborating more in the future and any updates will be posted here.

## Demo
https://www.youtube.com/watch?v=q8BldkjGH1Y&feature=youtu.be

## Tech/framework used
For educational purposes, only vanilla JS/HTML/CSS was used on the front-end.<br/>
The back-end is Ruby on Rails.

## Code Example
Part of what makes Hydro Blunder harder to code is that the boat can move side to side **and** up and down. Checking for collisions required code like this:

if (
&nbsp;&nbsp;(buoyLeftEdge <= boatLeftEdge && buoyRightEdge >= boatLeftEdge) ||
&nbsp;&nbsp;(buoyLeftEdge >= boatLeftEdge && buoyRightEdge <= boatRightEdge) ||
&nbsp;&nbsp;(buoyLeftEdge <= boatRightEdge && buoyRightEdge >= boatRightEdge)
) {
&nbsp;&nbsp;if (
&nbsp;&nbsp;&nbsp;&nbsp;(buoyTopEdge <= boatTopEdge && buoyBottomEdge >= boatTopEdge) ||
&nbsp;&nbsp;&nbsp;&nbsp;(buoyTopEdge >= boatTopEdge && buoyBottomEdge <= boatBottomEdge) ||
&nbsp;&nbsp;&nbsp;&nbsp;(buoyTopEdge <= boatBottomEdge && buoyBottomEdge >= boatBottomEdge)
&nbsp;&nbsp;) {
&nbsp;&nbsp;&nbsp;&nbsp;return true

## Installation
All you have to do is install rails and start the rails sever. The front-end is all thru index.html.

## How to use?
See the instructions in the game and/or demo.
