-module(shape).
-export([area/1]).

area({square, Side}) ->
  {ok, Side * Side};
area({circle, Radius}) ->
  {ok, 3.1416 * Radius * Radius};
area({triangle, A, B, C}) ->
  S = (A + B + C)/2,
  {ok, math:sqrt(S*(S-A)*(S-B)*(S-C))};
area(_) ->
  {error, invalid_object}.
