# Queens and Diamonds

Queens and diamonds is a simple card guessing game in which th player must guess and pick the right card (Queen of Diamonds). Each of the 4 cards is shuffled and then faced on its back to the player.If the play guesses the right card, they are awarded with points. There are4 rounds in total.

![image](https://user-images.githubusercontent.com/110638513/201011587-9bb162bb-d95b-43ac-8e2c-fed0e944721c.png)
## Features

* This card game features an image of the Queen of diamonds card in the header section. The Title is also located above the image.
* There Are also 4 cards which 'fly-into' to the page and into their respective positions when the page is loaded.
* Below the header section is an animated button that says 'Play Game'. The button zooms in once hovered over and commences the game when clicked.
* A 'score' and 'round' title are displayed in the header once the button is clicked.
* The cards show display an animation of shuffling the cards before the right card should be chosen.
* The cards flip once clicked to reveal the chosen/ unchosen cards.
* A reminder pop up allows player to continue from last game.

## header
* This screenshot shows the header section with an image of the Queen of diamonds card which the play must pick in order to gain points.
* A theme of pink is seen in this game while the other cards have different colors.

    ![QandD header](https://user-images.githubusercontent.com/110638513/201012091-5e4f1f84-d908-4ca2-ad67-cf767f1189bc.PNG)

## Four Cards Flying
 * As the page loads, the 4 cards 'fly-in' from the left of the page and into position.
               ![cards-flying-in](https://user-images.githubusercontent.com/110638513/201000357-6c23243d-ced2-40e9-b875-cbfea61cce38.PNG)


## Button area 
* This part of the project contains an animated button that zooms in when the play hovers over it.
              ![button-areaQ D](https://user-images.githubusercontent.com/110638513/200999878-d6f1249f-9749-4154-97a9-e72c3a9bb4ce.PNG)

## Keeping Score

Once the button is clicked, a score and round counter which awards:

* 100 points if the queen of diamonds is picked on the first round
* 50 points if it is picked in the 2nd round
* 25 points if it is picked on the 3rd round
* 10 points if it is picked on the 4th round
* No points if the wrong card is picked 

    ![header-start-game-Q D](https://user-images.githubusercontent.com/110638513/201002063-aca90758-8c99-48b0-bce9-ed134eda346e.PNG)

## Shuffling
At the beginning of each round, each card is shuffled for a period of 2 seconds. Once this happens, the positions of the cards become randomized and they are now facing backwards to the player.
As the positions have now changed. The player must guess where they think the Queen of diamonds lies. While the cards are shuffling, the screen with display the word 'shuffling..'.

![cards-shuffling](https://user-images.githubusercontent.com/110638513/201002653-b705d1f1-5dc4-482a-a6da-4b998c80797c.PNG)

## Right Card, Wrong Card

* Once the cards have finished shuffling and fall back into position, a card must be chosen . Once it is clicked, the card will rotate to reveal the right/wrong card . A few seconds later, the rest of the cards will flip over to reveal their true position.
If the Queen of diamonds is picked, a green message will show up saying 'Correct! Nice Guess'. If the wrong card is picked, it will display 'Wrong..Hard luck!'.


![queen-right-guess](https://user-images.githubusercontent.com/110638513/201002675-3a35702b-fb66-4620-83a4-009b232d1207.PNG)

![wrong-card](https://user-images.githubusercontent.com/110638513/201003778-8e617a77-fd4e-406f-a77e-4d590966d221.PNG)

## Reminder Notification

* If the player leaves the page for whatever reason, then decides to come back, their game will still be saved.They will also be asked if they want to cpnyinue with their last game.
* They can click 'ok' to continue with their last game or 'cancel' to start a new game.

![notification-pop-up-Q D](https://user-images.githubusercontent.com/110638513/201004969-c17f03b8-ddd3-4240-8ed8-b3d574450f8d.PNG)

## Final Score

* At the end of the game, the player will be given their final score after 4 rounds of playing.They will also be given the option to start again.

![Game-over-final-score](https://user-images.githubusercontent.com/110638513/201005231-367ce592-9158-45bc-8c06-e11d1c18d5e1.PNG)

## Testing 

* I have tested and can confirm that this page works in various browsers such as Firefox, Chrome and Safari

* My HTML code passed the  W3C validator test with no issues
![html-validator](https://user-images.githubusercontent.com/110638513/201006122-2bd3dd21-b693-41e3-88f7-bbb884d9dcfd.PNG)

*  My CSS code passed the  W3C validator test with no issues
![css-validator](https://user-images.githubusercontent.com/110638513/201006227-2fb6eccd-1e7d-411c-aad9-aa8be8b49ae0.PNG)

* I used the beautify tools javascript validator to check my javascript code and I only had one small error. Other messages were syntax warnings.
![error-warning](https://user-images.githubusercontent.com/110638513/201007074-d598ab9d-0b6a-4d4f-a6f2-4e5f82b80fee.PNG)

### Lighthouse Testing

![lighthouse testing](https://user-images.githubusercontent.com/110638513/201007914-f9ff712f-1ec4-4082-b302-488413cf8fc9.PNG)
* My accessibilty would've been better if I has added alt descriptions to my images, however I was not sure on how to do this as my images were inserted in the javascript code.

## Deployment
This website was deployed to git hub pages.
Steps to deploy:

1. In the git hub repository, navigate to the settings tab.
2. Click the pages section on the left-hand side of the screen,and you will see the source section.
3. From the source section drop, choose 'deploy from a branch'.
4. From the branch section drop, choose 'main'.
5. Refresh the page if the link is not instantly generated.
6. The page should now provide the link to the completed website.

# credits 


* The format used to make this README file was taken from the CI sample project README.md video [README.md example](https://learn.codeinstitute.net/courses/course-v1:CodeInstitute+CSSE_PAGPPF+2021_Q2/courseware/66cf361c769a41d496f5001fae6f9be7/3b5cd5dc8313462aa5975a3c9b9a1a3c/)
* The tutorial used to make this website was taken from [tutorial 1](https://www.youtube.com/watch?v=uyVTJelJq0A&t=3216s)
                                                                [tutorial 2](https://www.youtube.com/watch?v=Pcf4F5xa1xs ) 
* Card images were taken from [This Website](https://game-icons.net/1x1/aussiesim/card-ace-diamonds.html#download )  
