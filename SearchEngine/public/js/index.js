class Page{

    constructor(){
        this.btnVoice = document.querySelector('.btn-outline-danger');
        this.input = document.querySelector('input');

        this.btnSearch;
        this.aTAg;
        this.pageBtn;
        this.hiddenBtn;

        
        this.initialize();
    }

    initialize(){
        let homePage = document.querySelector('title');

        if(homePage.text == 'My Own Search Engine') {
            
            this.btnSearch = document.querySelector('.btn-outline-primary');
            this.aTAg = document.querySelector('#searchButton');

            this.BeginningEffects();
            this.addMainPageButtonEvents();
        }else {
            this.addScrollResultPage();
            this.paginationBtn();
        }

        this.addVoiceButtonEvent();
    }

    BeginningEffects(){
        let body = document.querySelector('body');

        body.style.visibility = 'visible';
        body.style.opacity = '1';
    }

    addMainPageButtonEvents(){
        this.btnSearch.addEventListener('mouseover', (e) =>{
            this.aTAg.style.color = 'white';
        });

        this.btnSearch.addEventListener('mouseout', (e) =>{
            this.aTAg.style.color = '#0d6efd';
        });
    }

    addVoiceButtonEvent(){

        this.btnVoice.addEventListener('mouseup', (e)=>{
            this.VoiceSearch();
        });
    }

    VoiceSearch(){
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new window.SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', (e)=>{
            const text = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
            console.log(text);
            this.input.value = text;
        });

        /*
        recognition.addEventListener('end', (e) =>{
            recognition.start();
        });
        */

        recognition.start();
    }


    addScrollResultPage(){
        window.addEventListener('scroll', (e)=>{
            let scroll_y = window.scrollY;
            let standardBar = document.querySelector('#StandardSearchBar');
            let navBar = document.querySelector('#nav-searchBar');
            
            if(scroll_y >= 87){

                standardBar.style.opacity = 0;
                standardBar.style.visibility = 'hidden';

                navBar.style.visibility = 'visible';
                navBar.style.opacity = 1;

            }else {

                navBar.style.opacity = 0;
                navBar.style.visibility = 'hidden';

                standardBar.style.visibility = 'visible';
                standardBar.style.opacity = 1;
            }
            
        });
    }

    paginationBtn(){
        this.pageBtn = document.querySelectorAll('.page');
        this.hiddenBtn = document.querySelector('.hiddenButton');
        
        this.pageBtn.forEach(element => {
            element.addEventListener('mouseup', (e)=>{

            });
        });
    }
}

const instanc = new Page();
