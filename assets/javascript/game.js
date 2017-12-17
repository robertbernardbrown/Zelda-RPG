$(document).ready(function(){

    //declare globals
    var isHero = true;
    var isDefender = false;
    var isBattle = false; 
    var heroes = {   
    hero_1: new MakeHero ('Link', 120, 9, 10, '<img src="assets/images/link.png" alt="link png">', new Audio ('assets/sounds/linkIntro.wav'), [new Audio ('assets/sounds/linkAttack.wav'), new Audio ('assets/sounds/linkAttack2.wav')]),
    hero_2: new MakeHero ('Zelda', 100, 15, 20, '<img src="assets/images/zelda.png" alt="zelda png">', new Audio ('assets/sounds/zeldaIntro.wav'), [new Audio ('assets/sounds/zeldaAttack.wav'), new Audio ('assets/sounds/zeldaAttack2.wav')]),
    hero_3: new MakeHero ('Dark-Link', 110, 10, 5, '<img src="assets/images/dark-link.png" alt="dark link png">', new Audio ('assets/sounds/darklinkIntro.wav'), [new Audio ('assets/sounds/darklinkAttack.wav'), new Audio ('assets/sounds/darklinkAttack2.wav')]),
    hero_4: new MakeHero ('Ganondorf', 180, 3, 25, '<img src="assets/images/ganondorf.png" alt="ganondorf png">', new Audio ('assets/sounds/ganondorfIntro.wav'), [new Audio ('assets/sounds/ganondorfAttack.wav'), new Audio ('assets/sounds/ganondorfAttack2.wav')])
    };
   
    //constructor for character objects
    function MakeHero (name, hitPoints, attackPoints, counterAttack, image, sounds, attackSounds) {
        this.name = name;
        this.hitPoints = hitPoints;
        this.attackPoints = attackPoints;
        this.counterAttack = counterAttack;
        this.image = image;
        this.sounds = sounds;
        this.attackSounds = attackSounds;
    }

    //render objects and supplementary headings and divs to the page
    function render (object) {
        for (i in object) {
            if (!object.hasOwnProperty(i)) continue; {
        $('.display').prepend('<div class="col-xs-6 col-md-3 hero thumbnail"' + 'id = "' + object[i].name + '">');
        $('#' + object[i].name).prepend('<h1>' + object[i].name + '</h1>')
                  .append(object[i].image)
                  .append('<h2>' + object[i].hitPoints + '</h2>')
        $('.display').append('</div>');
                    }
                }
                $('.your-hero').append('<h2> Your hero: </h2>');
                $('.enemies').append('<h2> Enemies available to attack: </h2>');
                $('.fight').prepend('<h2> Fight Section </h2>');
                $('.fight').append('<div class = "btn btn-primary attack">Attack</div>');
                $('.fight').append('<div class = "fight-text"></div>');
                $('.defender').append('<h2> Defender: </h2>');
            }

    //when isHero = true, this function allows a user to choose a hero which is then moved to a new div and sets isDefender = true
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
            champion().sounds.play();
        }
    }

    //when isDefender = true, this function allows user to choose a defender to fight against
    function chooseDefender () {
        if(isDefender) {
            $(this).detach();
            $(this).appendTo('.defender');
            $(this).removeClass('defenders');
            $(this).addClass('villain');
            isDefender = false;
            isBattle = true;
            villain();
            villain().sounds.play();
            $('.fight-text').empty();
            $('.fight-text').append('<div class = "fight-text-hero"></div>');
            $('.fight-text').append('<div class = "fight-text-villain"></div>');
        }
    }
    
    //when a champion is declared, grabs the associated data from the heroes object
    var champion = function () {
        var champId = $('.champion').attr('id');
        for(var i in heroes) {
            if( heroes[i].name == champId) {
                return (heroes[i]);
            }
        }
    }

    //when a villain is declared, grabs the associated data from the object
    var villain = function () { 
        var villainId = $('.villain').attr('id');
        for(var i in heroes) {
            if( heroes[i].name == villainId) {
                return (heroes[i]);
            }
        }
    }

    //choose a random sound to play for each hero
    function randomAttackSound () {
        var multiplier = Math.floor(Math.random() * (champion().attackSounds.length));
        champion().attackSounds[multiplier].play();
    }

    //launches when fight button is pressed
    //updates hero life and villain life based on opposer's hitpoints
    var counter = 0
    function fight () {
        noAttack();
        if (isBattle) {
            randomAttackSound();
            $('.fight-text-hero').empty();
            $('.fight-text-villain').empty();
                if (champion().hitPoints > 0 && champion().hitPoints > villain().counterAttack && villain().hitPoints > 0 && villain().hitPoints > champion().attackPoints) {
                    villain().hitPoints -= champion().attackPoints;
                    champion().hitPoints -= villain().counterAttack;
                    $('.fight-text-hero').html('<h2> You attacked ' + villain().name + ' for ' + champion().attackPoints + ' hitpoints. </h2>');
                    $('.champion h2').html(champion().hitPoints);
                    $('.fight-text-villain').html('<h2>' + villain().name + ' attacked you for ' + villain().counterAttack + ' hitpoints. </h2>');
                    $('.villain h2').html(villain().hitPoints);
                }
                else if (villain().hitPoints <= champion().attackPoints) {
                    villain().hitPoints -= champion().attackPoints;
                    $('.villain h2').html(villain().hitPoints);
                    $('.fight-text-hero').html('<h2> You attacked ' + villain().name + ' for ' + champion().attackPoints + ' hitpoints. </h2>');
                }
                else if (champion().hitPoints <= villain().counterAttack) {
                    champion().hitPoints -= villain().counterAttack;
                    $('.champion h2').html(champion().hitPoints);
                    $('.fight-text-villain').html('<h2>' + villain().name + ' attacked you for ' + villain().counterAttack + ' hitpoints. </h2>');
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
                isBattle = false;
            }
            else if (villain().hitPoints <= 0) {
                chooseAnotherHero();
                isBattle = false;
            }
        }
    }

    //prevents attacking when hero or defender isn't set
    function noAttack () {
        if (isHero && !isBattle && !isDefender) {
            $('.fight-text').html('<h3> Please choose a champion </h3>');
        }
        else if (!isHero && !isBattle && isDefender) {
            $('.fight-text').html('<h3> Please choose an enemy </h3>');
        }
    }

    //prompts user to choose another defender when previous defender is defeated - will launch win function after a certain number of launches
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

    //prompts user about their win
    function win () {
        $('.fight-text').append('<h3> You defeated ' + villain().name + '! You won! The Triforce is yours. Play again?');
        $('#' + villain().name).detach();
        $('.fight-text').append('<div class = "btn btn-primary reset">Start Over</div>');
        $('.fight-text').addClass('winner');
        var winningTheme = new Audio ('assets/sounds/youwin.mp3')
        winningTheme.play();
    }

    //prompts users about their loss
    function lose () {
        $('.fight-text').append('<h3> You lost! Try Again? </h3>');
        $('.fight-text').append('<div class = "btn btn-primary reset">Start Over</div>');
        var isBattle = false; 
        var losingTheme = new Audio ('assets/sounds/gameover.mp3')
        losingTheme.play();
    }

    //resets the game when the reset button is pressed and resets globals and hero object
    function reset () {
        isHero = true;
        isDefender = false;
        isBattle = false; 
        $('.display').empty();
        $('.your-hero').empty();
        $('.enemies').empty();
        $('.fight').empty();
        $('.defender').empty();
        heroes = {   
            hero_1: new MakeHero ('Link', 120, 9, 10, '<img src="assets/images/link.png" alt="link png">', new Audio ('assets/sounds/linkIntro.wav'), [new Audio ('assets/sounds/linkAttack.wav'), new Audio ('assets/sounds/linkAttack2.wav')]),
            hero_2: new MakeHero ('Zelda', 100, 15, 20, '<img src="assets/images/zelda.png" alt="zelda png">', new Audio ('assets/sounds/zeldaIntro.wav'), [new Audio ('assets/sounds/zeldaAttack.wav'), new Audio ('assets/sounds/zeldaAttack2.wav')]),
            hero_3: new MakeHero ('Dark-Link', 110, 15, 5, '<img src="assets/images/dark-link.png" alt="dark link png">', new Audio ('assets/sounds/darklinkIntro.wav'), [new Audio ('assets/sounds/darklinkAttack.wav'), new Audio ('assets/sounds/darklinkAttack2.wav')]),
            hero_4: new MakeHero ('Ganondorf', 180, 3, 25, '<img src="assets/images/ganondorf.png" alt="ganondorf png">', new Audio ('assets/sounds/ganondorfIntro.wav'), [new Audio ('assets/sounds/ganondorfAttack.wav'), new Audio ('assets/sounds/ganondorfAttack2.wav')])
            };
        counter = 0;
        winCounter = 0;
        render(heroes);
    }

    //runs audio on page load. Everyone's favorite two words from the game
    function heyListen () {
        var navi = [new Audio ('assets/sounds/hey.wav'), new Audio ('assets/sounds/listen.wav')];
        navi[0].play();
        setTimeout( function () {navi[1].play()}, 500);
    }


    $(document).on('click', '.hero', chooseHero);
    $(document).on('click', '.defenders', chooseDefender);
    $(document).on('click', '.fight', fight);
    $(document).on('click', '.reset', reset);
    
    render(heroes);
    heyListen();
});

//CREDITS

//IMAGES
//Ganondorf
//https://en.wikipedia.org/wiki/Ganon
//https://www.forbes.com/sites/olliebarder/2017/04/24/nintendo-officially-confirms-ganondorfs-full-name-from-the-zelda-series/#45afb15e4ec9
//Link
//http://mcleodgaming.wikia.com/wiki/File:Link.png
//http://the-legend-of-zelda-series.tumblr.com/post/109340004475
//Zelda
//http://zelda.wikia.com/wiki/File:Zelda_(SSB_3DS_%26_Wii_U).png
//https://i.ytimg.com/vi/jo9hNmJm9qc/maxresdefault.jpg
//Dark-Link
//http://powerlisting.wikia.com/wiki/File:Dark_Link.png
//https://orig00.deviantart.net/4ad6/f/2015/084/9/3/dark_link_wallpaper__wallpaper__by_cryo_psycho-d8n3ylj.jpg
//Triforce
//https://wifflegif.com/tags/45995-triforce-gifs?page=2
//Background
//https://cheetashock.deviantart.com/art/Gold-Triforce-Wallpaper-439572554

//SOUNDS
//https://downloads.khinsider.com/game-soundtracks/album/legend-of-zelda-ocarina-of-time-original-sound-track
//http://noproblo.dayjo.org/ZeldaSounds/