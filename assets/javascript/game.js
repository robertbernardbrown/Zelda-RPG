$(document).ready(function(){

    var heroChosen = true;
    var enemyChosen = false;
    var battleVar = false; 
   
    function MakeHero (name, hitPoints, attackPoints) {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackPoints = attackPoints;
    }

    var Link = new MakeHero ('Link', 120, 8);
    var Zelda = new MakeHero ('Zelda', 100, 8);
    var darkLink = new MakeHero ('Dark Link', 100, 8);
    var ganondorf = new MakeHero ('Ganondorf', 150, 8);

    console.log(Zelda.hitPoints);
    
});

// 1. onclick function - user picks which hero they want to be
// when clicked, hero selection space dissappears - change div class on the chosen hero to the YOUR HERO section
// defenders switch to Enemies available to attack area - change div class to the enemy section

// 2. onclick function - user picks which defender to play
// switch class of chosen defender to defender section

// 3. onclick function - attack
// onclick, run the function to display "you attacked X for X damage, X attacked you for X damage"

// 4. run function to increment the attack power for the hero

// 5. function to run when hitpoints for hero reach 0
// display loser message and show restart button

// 6. restart button
// reset the div classes to how they were at the start
// reset switch locks

// 7. function to run when hitpoints for defender reach 0
// display winner message and ask them to choose another defender to fight
// change the old defender class to hidden
// change the new choice to defender

// 8. function to run when all three defenders are beaten
// display win message
// show restart button

// set a variable to incrment whenever a defender is beaten? listen for the third win?