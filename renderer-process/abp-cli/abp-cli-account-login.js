const exec = require('child_process').exec

let isRunning = false

let consoleNode = document.getElementById('box-abp-cli-account-login').getElementsByTagName('textarea')[0]

const execBtn = document.getElementById('account-login-execute')

execBtn.addEventListener('click', (event) => {
  runExec()
})

function runExec() {
  let username = document.getElementById('account-login-username').value
  let password = document.getElementById('account-login-password').value
  if (isRunning || !username || !password) return
  isRunning = true
  execBtn.disabled = true
  document.getElementById('account-login-process').style.display = 'block'

  let cmdStr = 'abp login ' + username
  clearConsoleContent()
  addConsoleContent(cmdStr + '\n\nRunning...\n')
  scrollConsoleToBottom()
  console.log(cmdStr)
  // Todo: how to input password?
  workerProcess = exec('chcp 65001 & ' + cmdStr, {cwd: '/'})
  
  workerProcess.stdout.on('data', function (data) {
    addConsoleContent(data)
    scrollConsoleToBottom()
  });
 
  workerProcess.stderr.on('data', function (data) {
    addConsoleContent(data)
    scrollConsoleToBottom()
  });
 
  workerProcess.on('close', function (code) {
    isRunning = false
    execBtn.disabled = false
  })

  function scrollConsoleToBottom() {
    consoleNode.scrollTo(0, consoleNode.scrollHeight)
  }

  function addConsoleContent(text) {
    consoleNode.appendChild(document.createTextNode(text))
  }

  function clearConsoleContent() {
    consoleNode.innerHTML = ''
  }
}