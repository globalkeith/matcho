defmodule Matcho.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", message, socket) do
    IO.puts "message:"
    IO.inspect message
    IO.puts "socket:"
    IO.inspect socket

    Process.flag(:trap_exit, true)
    # :timer.send_interval(5000, :ping)
    send(self, {:after_join, message})

    {:ok, socket}
  end


  def handle_info({:after_join, message}, socket) do
    push socket, "join", %{status: "connected"}
    {:noreply, socket}
  end

  def handle_in("new:msg", message, socket) do
    # do some things
    broadcast! socket, "shape:delete", %{id: message["id"]}
    {:noreply, socket}
  end
end
