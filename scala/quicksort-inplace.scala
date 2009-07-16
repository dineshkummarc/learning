import java.lang.System
import scala.Random

//sort from http://www.scala-lang.org/docu/files/ScalaByExample.pdf

def sort(xs: Array[Int]) {
  def swap(i: Int, j: Int) {
    val t = xs(i); xs(i) = xs(j); xs(j) = t
  }
  def sort1(l: Int, r: Int) {
    val pivot = xs((l + r) / 2)
    var i = l; var j = r
    while (i <= j) {
      while (xs(i) < pivot) i += 1
      while (xs(j) > pivot) j -= 1
	1
      if (i <= j) {
	swap(i, j)
	i += 1
	j -= 1
      }
    }
    if (l < j) sort1(l, j)
    if (j < r) sort1(i, r)
  }
  sort1(0, xs.length - 1)
}

def fill_array(): Array[Int] = {
  var xs = new Array[Int](100)
  var rand = new Random(System.currentTimeMillis())
  for (i <- List.range(0, 100)) xs(i) = rand.nextInt(100)
  xs
}

def print_array(xs: Array[Int]): String = {
  var str = new String
  xs.foreach(x => str += x + ",")
  str.substring(0, str.length -1)
}

var start = fill_array()
println("Start: [" + print_array(start) + "]")
sort(start)
println
println("Sorted: [" + print_array(start) + "]")
