# Prima24
  * Title: Submarun
  * Author: Christian Hauser Josef Daiber / MIB / 265607
  * Year and season: 2023/2024 Winter
  * Course this development was created in: PRIMA 
  * Docent: Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl

# Playable Online Version
https://christianhauser.github.io/Prima24/index.html

# Source Code
https://github.com/ChristianHauser/Prima24

# Design Document
https://docs.google.com/document/d/1mTExThxlzYXiJvk5oiKpVPf0sh90cMzLoXPZLW37s58/edit?usp=sharing

# Controls
WASD or Arrowkeys to move, Spacebar to shoot

## Checklist for Vampire Runner
A more detailed version can be found in the Design Document which I linked to above

| Nr | Criterion | Explanation | 
| :---: | :---: | --- | 
| 1 | Units and Positions |0 is where the Playermodel is located in the beginning and it also stays there in terms of the X-Achsis movement since this one is stationary. The whole level moves towards us in the form of -X movement whereas the player is rotated along the World X-Achsis. Therefore 1 is located 1 unit along the positive X-Achsis.|
| 2 | Hierarchy | I have multiple Graphs that give hierachy to different parts of my Game for example the Player contains the Camera Reference, Cannon, and PlayerModel with important features each but all still part of the player|
| 3 | Editor | The visuel Editor is good for loading in your 3d Models setting up Rigidbody components or applying Custom componentscripts. For the Functionalities going into Code is needed.|
| 4 | Scriptcomponent |I use a lot of them because it is instantiable for each Object you drag it onto, it is helpfull when spawning in an Object with Logic already applied to it and can be reused.|
| 5 | Extend | I extend the Fudge component animator so the item animation script is more readable to clean up the animation script. In case of needing other items to use the hover animation it's now possible to only attach the component in the editor for it to be able to animate.|
| 6 | Sound | I use an audiolistener on the player, Sounds are played on for example a torpedo that emits a sound when colliding which is then the source location of the sound resulting in a different explosion volume giving the player more immersion in 3d space. |
| 7 | VUI | There is quick guide to the controlls on the top left, a timer showing how many seconds you ve lasted on the bottom left, Health to indicate how much health you have and a Coin and Amunition Counter. |
| 8 | Event-System | I use a custom Event on the Obstacle Walls that detects collision of the Player and propagates it to the Player to deal damage. |
| 9 | External Data | I have an external config file which makes adjusting the parameters inside of the game possible externally. You can use for example the “minimumAmmunition” and other variables to make the game harder or easier |
| A | Light |I have an ambient light to light up the 3d environment generally in a blue light to sell the underwater location a bit more and two directional lights with vibrant colors that give the world and the Playermodel more contrast resulting in a more atmospheric scene over all.  |
| B | Physics |I use collisions in several places like the PipeCollision to restrict the movement of the Player to not escape the environment. I use several trigger colliders to check for collisions and give logic to the consequences of colliding with objects like the Obstacle walls. I use forces and torques to fire my torpedo through space and make it fly out in front of you with great speed. |
| C | Net |I did not use the network functionality. |
| D | I did not use the state machine. |
| E | Animation |There is a simple animation for the collectable 3d items (ammunition,coins) which translates and rotates said items based on set keyframes making use of the FudgeCore animation system. I also implemented a FudgeAid sprite animation to take place when the torpedo collides with an object which also is located at the correct location of the torpedoes location on collision.  |