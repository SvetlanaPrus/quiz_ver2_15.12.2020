import React, {useState} from 'react';
import './App.css';

interface ITask {
    firstNumber: number
    sign: string
    secondNumber: number
    sysAnswer: number      //otvet samoj sistemi na primer
    count: number
}

function App() {
    const [tasks, setTasks] = useState<ITask[]>([])                      //massiv primerov
    const [startIsPress, setStartIsPress] = useState(false)             //kontrol knopki 'Start'
    const [count, setCount] = useState(1)                           //kontrol za kolichestvom primerov
    const [myAnswer, setMyAnswer] = useState('')                   //kontrol stroki 'input'
    // const [okIsPress, setOkIsPress] = useState(false)
    const [rightAnswer, setRightAnswer] = useState(0)
    const [wrongAnswer, setWrongAnswer] = useState(0)

    //zadaem vse peremennie:
    const mySign = ['+', '-', '*']
    const firstNumber = Math.floor(Math.random() * 10)
    const secondNumber = Math.floor(Math.random() * 10)
    const sign = mySign[Math.floor(Math.random() * mySign.length)]


    //peremennaja 'otvet sistemi na primer':
    const getSysAnswer = () => {
        let sysResult = 0;
        switch (sign) {
            case "+":
                sysResult = firstNumber + secondNumber;
                break;
            case "-":
                sysResult = firstNumber - secondNumber;
                break;
            case "*":
                sysResult = firstNumber * secondNumber;
                break;
        }
        return sysResult;
    }

    //zapusk primera dlja polzovatelja:
    const quiz = () => {
        const newCount = count + 1;
        setCount(newCount);                                           //zapuskaem schetchik zadach
        if (count === 10) {                                                  //esli uze 10 primerov - vihodim
            setCount(0)                                                 //schetchik obnuljaem
            exit()
        } else {
            setStartIsPress(true);                                     //menjaem status nazatija knopki 'Start'
            const a = getSysAnswer();
            const newQuiz = [...tasks, {firstNumber, sign, secondNumber, sysAnswer: a, count}]
            setTasks(newQuiz)
        }
    }

    const save = (myAnswer: number) => {
        if (count === 10) {
            finish()
        } else {
            myAnswer === rightAnswer ? setRightAnswer(rightAnswer + 1) : setWrongAnswer(wrongAnswer + 1)
        }
        setMyAnswer('');                                               //ochistka polja vvoda v 'input'
        {quiz()}
    }

    const finish = () => {
        alert(`Right answers: ${rightAnswer}, wrong answers: ${wrongAnswer}`)
        {
            exit()
        }
    }

    const exit = () => {
        setStartIsPress(false)
        setTasks([])
    }
    console.log(tasks)
    console.log(count)

    return (
        <div className="App">
            {startIsPress ?
                <span>
                    <h2>Please solve this task:</h2>
                    {tasks.map((el, index) =>
                        index === tasks.length - 1 ?
                            <div>
                                {index + 1}) {el.firstNumber} {el.sign} {el.secondNumber} = {el.sysAnswer}
                                <input type='number' value={myAnswer} onChange={(e) => setMyAnswer(e.target.value)}/>
                                <button onClick={ () => save(+myAnswer)}>Save</button>
                            </div>
                            : <></>
                    )}
                </span>
                : <></>
            }

            {startIsPress ?
                <ul>
                    {count === 10 ?
                        <button onClick={finish}> Finish </button>
                        : <button onClick={quiz}> New Quiz </button>
                    }
                    <button onClick={exit}> Exit</button>
                </ul>
                : <button onClick={quiz}> Start </button>
            }
        </div>
    );
}

export default App;
