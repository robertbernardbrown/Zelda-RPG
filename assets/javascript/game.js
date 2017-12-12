// initialize JS with jQuery
$(document).ready(function(){

    var heroChosen = true;
    var enemyChosen = false;
    var battleVar = false; 

    var link = {
        name: 'Link',
        hitpoints: 120,
        attackPower: 8
    }
    var zelda = {
        name: 'Zelda',
        hitpoints: 100,
        attackPower: 8
    }
    var darkLink = {
        name: 'Dark Link',
        hitpoints: 100,
        attackPower: 8
    }
    var ganondorf = {
        name: 'Ganondorf',
        hitpoints: 100,
        attackPower: 8
    }

    function displayHitpoints () {
        linkHP = $('.link').attr('value');
        darkLinkHP = $('.dark-link').attr('value');
        ganondorfHP = $('.ganondorf').attr('value');
        zeldaHP = $('.zelda').attr('value');

        $('.link').append('<h3>' + linkHP + '</h3>')
        $('.dark-link').append('<h3>' + darkLinkHP + '</h3>')
        $('.ganondorf').append('<h3>' + ganondorfHP + '</h3>')
        $('.zelda').append('<h3>' + zeldaHP + '</h3>')
    }
  
    function heroChoice() {
     
        if (heroChosen) {
            $(this).removeClass( 'hero' );      
            $(this).addClass( 'champion' );
            $(this).insertAfter( $( '.your-hero') );
            $('.hero').insertAfter ( $( '.enemies') );    
            $('.hero').addClass( 'villain-choices' );
            $('.villain-choices').removeClass( 'hero' );
            
            heroChosen = false;
            enemyChosen = true;
        }
    }

    function villainChoice () {
        if (enemyChosen) {     
            $(this).addClass( 'villain' );
            $(this).insertAfter( $( '.defender') );
            enemyChosen = false;
            battleVar = true;
        }
    }

    function battle () {
        if (battleVar) {
        console.log( $('.champion').attr('value'));
        console.log( $('.villain').attr('value'));
        }
    }


    $('.hero').on('click', heroChoice);
    $(document).on('click','.villain-choices', villainChoice);
    $('.attack').on('click', battle);
    
    displayHitpoints();

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