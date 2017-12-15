$(document).ready(function(){

    var isHero = true;
    var isDefender = false;
    var isBattle = false; 
    var heroes = {   
    hero_1: new MakeHero ('Link', 120, 8, '<img src="assets/images/link.png" alt="link png">'),
    hero_2: new MakeHero ('Zelda', 100, 8, '<img src="assets/images/zelda.png" alt="zelda png">'),
    hero_3: new MakeHero ('Dark-Link', 100, 8, '<img src="assets/images/dark-link.png" alt="dark link png">'),
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
        $('.row').prepend('<div class="col-xs-6 col-md-3 hero thumbnail"' + 'id = "' + object[i].name + '">');
        $('#' + object[i].name).prepend('<h1>' + object[i].name + '</h1>')
                  .append(object[i].image)
                  .append('<h2>' + object[i].hitPoints + '</h2>')
                  .attr('attack', object[i].attackPoints)
                  .attr('life', object[i].hitPoints);
        $('.row').append('</div>');
                    }
                }
                $('.your-hero').append('<h2> Your hero: </h2>');
                $('.enemies').append('<h2> Enemies available to attack: </h2>');
                $('.fight').prepend('<h2> Fight Section </h2>');
                $('.fight').append('<div class = "btn btn-primary attack">Attack</div>');
                $('.fight').append('<div class = "fight-text"></div>');
                $('.defender').append('<h2> Defender: </h2>');
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
            $('.fight-text').empty();
            $('.fight-text').append('<div class = "fight-text-hero"></div>');
            $('.fight-text').append('<div class = "fight-text-villain"></div>');
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

    var counter = 0
    function fight () {
        if (isBattle) {
            $('.fight-text-hero').empty();
            $('.fight-text-villain').empty();
                if (champion().hitPoints > 0 && champion().hitPoints > villain().attackPoints && villain().hitPoints > 0 && villain().hitPoints > champion().attackPoints) {
                    villain().hitPoints -= champion().attackPoints;
                    champion().hitPoints -= villain().attackPoints;
                    $('.fight-text-hero').html('<h2> You attacked ' + villain().name + ' for ' + champion().attackPoints + ' hitpoints. </h2>');
                    $('.champion h2').html(champion().hitPoints);
                    $('.fight-text-villain').html('<h2>' + villain().name + ' attacked you for ' + villain().attackPoints + ' hitpoints. </h2>');
                    $('.villain h2').html(villain().hitPoints);
                }
                else if (champion().hitPoints <= villain().attackPoints) {
                    champion().hitPoints -= villain().attackPoints;
                    $('.champion h2').html(champion().hitPoints);
                    $('.fight-text-villain').html('<h2>' + villain().name + ' attacked you for ' + villain().attackPoints + ' hitpoints. </h2>');
                }
                else if (villain().hitPoints <= champion().attackPoints) {
                    villain().hitPoints -= champion().attackPoints;
                    $('.villain h2').html(villain().hitPoints);
                    $('.fight-text-hero').html('<h2> You attacked ' + villain().name + ' for ' + champion().attackPoints + ' hitpoints. </h2>');
                }

            counter++
            if (counter === 1) {
                champion().attackPoints = champion().attackPoints + (champion().attackPoints);
            }
            else if (counter > 1) {
                champion().attackPoints = champion().attackPoints + (champion().attackPoints / counter);
            }

            if (champion().hitPoints <= 0) {
                lose();
            }
            else if (villain().hitPoints <= 0) {
                chooseAnotherHero();
                isBattle = false;
            }
        }
    }

    var winCounter = 0;
    function chooseAnotherHero () {
        winCounter++;
        if (winCounter < (Object.keys(heroes).length - 1)) {
        $('.fight-text').append('<h3> You defeated ' + villain().name + '! Choose the next defender to attack. </h3>');
        $('#' + villain().name).detach();
        isDefender = true;
        }
        else if (winCounter === (Object.keys(heroes).length - 1)) {
            win();
        }
    }

    function win () {
        $('.fight-text').append('<h3> You defeated ' + villain().name + '! You won! The Triforce is yours. Play again?');
        $('#' + villain().name).detach();
        $('.fight-text').append('<div class = "btn btn-primary reset">Start Over</div>');
    }

    function lose () {
        $('.fight-text').append('<h3> You lost! Try Again? </h3>');
        $('.fight-text').append('<div class = "btn btn-primary reset">Start Over</div>');
        var isBattle = false; 
    }

    function reset () {
        isHero = true;
        isDefender = false;
        isBattle = false; 
        $('.row').empty();
        $('.your-hero').empty();
        $('.enemies').empty();
        $('.fight').empty();
        $('.defender').empty();
        heroes = {   
            hero_1: new MakeHero ('Link', 120, 8, '<img src="assets/images/link.png" alt="link png">'),
            hero_2: new MakeHero ('Zelda', 100, 8, '<img src="assets/images/zelda.png" alt="zelda png">'),
            hero_3: new MakeHero ('Dark-Link', 100, 8, '<img src="assets/images/dark-link.png" alt="dark link png">'),
            hero_4: new MakeHero ('Ganondorf', 150, 8, '<img src="assets/images/ganondorf.png" alt="ganondorf png">')
            };
        counter = 0;
        winCounter = 0;
        render(heroes);
    }


    $(document).on('click', '.hero', chooseHero);
    $(document).on('click', '.defenders', chooseDefender);
    $(document).on('click', '.fight', fight);
    $(document).on('click', '.reset', reset);
    
    render(heroes);
});
