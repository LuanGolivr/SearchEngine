class Page{

    constructor(){
        this.btnVoice = document.querySelector('.btn-outline-danger');
        this.input = document.querySelector('input');

        this.btnSearch;
        this.aTAg;
        
        this.initialize();
    }

    initialize(){
        let homePage = document.querySelector('title');

        if(homePage.text == 'My Own Search Engine') {
            
            this.btnSearch = document.querySelector('.btn-outline-primary');
            this.aTAg = document.querySelector('#searchButton');

            this.BeginningEffects();
            this.addMainPageButtonEvents();
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

        this.aTAg.addEventListener('mouseup', (e)=>{
            let inputContent = document.querySelector('input').value;

            if(inputContent != ''){
                this.aTAg.href = '/result';
            }else {
                this.aTAg.href = '';
            }
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
}

const instanc = new Page();
