defmodule Matcho.PageController do
  use Matcho.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
