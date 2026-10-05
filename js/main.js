document.querySelector('.send').addEventListener('click',wuTang);
function wuTang(){
    const questions = ['name1','name2','name3']
    const answers = questions.map(function (question){
        //instead of usign the index we are using the name will only grabbed the ones that are checked bc of the radio 
        const picked = document.querySelector('input[name = "' + question + '"]:checked') 
        //an answer questions that stays empty it is unchecked
        return picked ? picked.value : '';
    })
    //verify that all the radio buttons where selected
    if(answers.includes('')){
        document.querySelector('#message').innerText = 'Protection your Neck';
        return 

    }
    //we get an query like query['name1=a','name2=b']
    const query = questions 
    .map(function(question,index){
        return question + '=' + answers[index];
    })
    .join('&') 

    fetch('/api?' + query)
    .then(function (response) {
        return response.json()
    })
    .then(function(data){
        document.querySelector('.result').style.display="flex"
        document.querySelector('#message').innerText = 'Your Name and Lastname are: ' + data.sendingValue;
    })
}


