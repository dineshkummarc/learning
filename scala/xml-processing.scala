var test_xml = 
<phonebook>
  <descr>Phone numbers of<b>XML</b> hackers.</descr>
  <entry>
    <name>Burak</name>
    <phone where="work"> +41 21 693 68 67 </phone>
    <phone where="mobile"> +41 78 601 54 36 </phone>
  </entry>
</phonebook>;

println("Full")
println(test_xml\\"entry"\\"name")
println()
println("Name")
println(test_xml\\"entry"\\"name")
println()
