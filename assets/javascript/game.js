$(document).ready(function(){

    var isHero = true;
    var isDefender = false;
    var isBattle = false; 
    var heroes = {   
    hero_1: new MakeHero ('Link', 120, 8, '<img src="assets/images/link.png" alt="link png">'),
    hero_2: new MakeHero ('Zelda', 100, 12, '<img src="assets/images/zelda.png" alt="zelda png">'),
    hero_3: new MakeHero ('Dark-Link', 100, 12, '<img src="assets/images/dark-link.png" alt="dark link png">'),
    hero_4: new MakeHero ('Ganondorf', 150, 8, '<img src="assets/images/ganondorf.png" alt="ganondorf png">')
    };
   
    function MakeHero (name, hitPoints, attackPoints, image) {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackPoints = attackPoints;
        this.image = image;
    }

    function render (object) {
        for (i in object) {
            if (!object.hasOwnProperty(i)) continue; {
        $('.row').prepend('<div class="col-xs-6 col-md-3 hero thumbnail"' + 'id = "' + object[i].name + '">')
        $('#' + object[i].name).prepend('<h1>' + object[i].name + '</h1>')
                  .append(object[i].image)
                  .append('<h2>' + object[i].hitPoints + '</h2>')
                  .attr('attack', object[i].attackPoints)
                  .attr('life', object[i].hitPoints);
        $('.row').append('</div>')
                    }
                }
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
            champion();
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
            villain();
        }
    }
    
    var champion = function () {
        var champId = $('.champion').attr('id');
        for(var i in heroes) {
            if( heroes[i].name == champId) {
                return (heroes[i]);
            }
        }
    }

    var villain = function () { 
        var villainId = $('.villain').attr('id');
        for(var i in heroes) {
            if( heroes[i].name == villainId) {
                return (heroes[i]);
            }
        }
    }

    var counter = 1
    function fight () {
        champion().hitPoints -= villain().attackPoints
        villain().hitPoints -= champion().attackPoints
        champion().attackPoints = champion().attackPoints + (champion().attackPoints / counter)
        counter++
        console.log(champion().attackPoints)
    }



    $(document).on('click', '.hero', chooseHero);
    $(document).on('click', '.defenders', chooseDefender);
    $(document).on('click', '.fight', fight);
    
    render(heroes);
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