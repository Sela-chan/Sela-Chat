const socket = io.connect('http://localhost:6677', { 'forceNew': true });

socket.on('messages', (data) => {
   console.log(data);
   render(data);
});

function checkSubmit(e) {
   if(e && e.keyCode == 13) {
      document.forms[0].submit();
   }
}

function render(data) {
   var html = data.map((msg, idx) => {
      return (`
         <div class="message">
            <strong>${msg.nickname}:</strong>
            <p>${msg.text}</p>
         </div>
      `)
   }).join(' ');
   var div_msgs = document.getElementById('messages');
   div_msgs.innerHTML = html;
   div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
   var msg = {
      nickname: document.getElementById("nickname").value,
      text: document.getElementById("text").value
   }
   document.getElementById("nickname").style.display = 'none';
   socket.emit('add-message', msg);
   return false;
}