import {Socket} from "phoenix"

// let socket = new Socket("/ws")
// socket.connect()
// let chan = socket.chan("topic:subtopic", {})
// chan.join().receive("ok", resp => {
//   console.log("Joined succesffuly!", resp)
// })

class App {
  static init() {
    let socket = new Socket("/socket", {
      logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
    })
    socket.connect()

    var chan = socket.chan("rooms:lobby", {})
    chan.join().receive("ignore", () => console.log("auth error"))
               .receive("ok", () => console.log("join ok"))
               .after(10000, () => console.log("Connection interruption"))

    $(".square").on("click", e => {
      chan.push("new:msg", { id: $(e.target).data("id") })
    })

    chan.on("shape:delete", msg => {
      $(`#${msg.id}`).remove()
    })

    chan.on("join", msg => {
      console.log(msg)
    })
  }
}

$( () => App.init() )

export default App
