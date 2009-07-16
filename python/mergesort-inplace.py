import random

def sort(seq, lo, hi):
    if lo >= hi:
        return
    mid = (lo+hi) / 2
    sort(seq, lo, mid)
    sort(seq, mid+1, hi)
    merge(seq, lo, mid, hi, mid+1)

def merge(seq, lo, end_lo, hi, start_hi):
    while lo <= end_lo and start_hi <= hi:
        if seq[lo] <= seq[start_hi]:
            lo += 1
        else:
            seq.insert(lo, seq.pop(start_hi))
            lo += 1
            end_lo += 1
            start_hi += 1

l = range(100)
random.shuffle(l)
print "Start with: ", l
print "---"
sort(l, 0, len(l)-1)
print "End with: ", l
