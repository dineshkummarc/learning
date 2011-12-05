-module(mathy).
-export([sum/1,create/1]).

sum(N) -> sum(N, 0).
sum(0, Accum) -> Accum;
sum(N, Accum) -> sum(N-1, Accum+N).

create(N) ->
  create(N, []).
create(0, Accum) ->
  Accum;
create(N, Accum) ->
  [create(N - 1) | Accum].
