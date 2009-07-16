import java.lang.System
import scala.Random

//sort from http://www.scala-lang.org/docu/files/ScalaByExample.pdf

def sort(xs: Array[Int]): Array[Int] = {
  if (xs.length <= 1) xs
  else {
    val pivot = xs(xs.length / 2)
    Array.concat(
      sort(xs filter (pivot >)),
      xs filter (pivot ==),
      sort(xs filter (pivot <)))
  }
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
println
println("Sorted: [" + print_array(sort(start)) + "]")
