-module(cc).
-export([go/0,loop/0]).

go() -> register(echo, spawn(cc, loop, [])).

loop() ->
  receive
    {From, Msg} ->
      From ! {self(), Msg},
      loop();
    stop -> true
  end.
