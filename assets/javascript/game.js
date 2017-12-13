$(document).ready(function(){

    var isHero = true;
    var isDefender = false;
    var isBattle = false; 
    var link = new MakeHero ('Link', 120, 8);
    var zelda = new MakeHero ('Zelda', 100, 12);
    var darkLink = new MakeHero ('Dark Link', 100, 12);
    var ganondorf = new MakeHero ('Ganondorf', 150, 8);
    var champion = link
    var villain = zelda
   
    function MakeHero (name, hitPoints, attackPoints) {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackPoints = attackPoints;
    }

    function render () {
        $('.link').prepend('<h1>' + link.name + '</h1>')
                  .append('<img src="assets/images/link.png" alt="link png">')
                  .append('<h2>' + link.hitPoints + '</h2>')
                  .attr('attack', link.attackPoints)
                  .attr('life', link.hitPoints);
        $('.zelda').prepend('<h1>' + zelda.name + '</h1>')
                   .append('<img src="assets/images/zelda.png" alt="zelda png">')
                   .append('<h2>' + zelda.hitPoints + '</h2>')
                   .attr('attack', zelda.attackPoints)
                   .attr('life', zelda.hitPoints);
        $('.dark-link').prepend('<h1>' + darkLink.name + '</h1>')
                       .append('<img src="assets/images/dark-link.png" alt="dark link png">')
                       .append('<h2>' + darkLink.hitPoints + '</h2>')
                       .attr('attack', darkLink.attackPoints)
                       .attr('life', darkLink.hitPoints);
        $('.ganondorf').prepend('<h1>' + ganondorf.name + '</h1>')
                       .append('<img src="assets/images/ganondorf.png" alt="ganondorf png">')
                       .append('<h2>' + ganondorf.hitPoints + '</h2>')
                       .attr('attack', ganondorf.attackPoints)
                       .attr('life', ganondorf.hitPoints);
    }

    function chooseHero () {
        if(isHero) {
            $(this).detach();
            $(this).removeClass('hero');
            $(this).addClass('champion');
            $(this).appendTo('.your-hero');
            $('.hero').addClass('defenders');
            $('.defenders').appendTo('.enemies')
            $('.hero').removeClass('hero');
            isHero = false;
            isDefender = true;
        }
    }

    function chooseDefender () {
        if(isDefender) {
            $(this).detach();
            $(this).appendTo('.defender');
            $(this).removeClass('defenders');
            $(this).addClass('villain');
            isDefender = false;
            isBattle = true;
        }
    }
    

    function fight (championObject, villainObject) {
            var championLife = championObject.hitPoints
            var championAttack = championObject.attackPoints
            var villainLife = villainObject.hitPoints
            var villainAttack = villainObject.attackPoints
            console.log(championLife = championLife - villainAttack)

    }



    $('.hero').on('click', chooseHero);
    $(document).on('click', '.defenders', chooseDefender);
    $('.fight').on('click', function () { fight(champion, villain); });
    
    render();
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