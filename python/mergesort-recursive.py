import random

def sort(seq):
    seq_len = len(seq)
    if seq_len <= 1:
        return seq
    else:
        mid = seq_len / 2
        return merge(sort(seq[:mid]),sort(seq[mid:]))

def merge(l_seq, r_seq):
    result = []
    while len(l_seq) > 0 and len(r_seq) > 0:
        if l_seq[0] <= r_seq[0]:
            result.append(l_seq.pop(0))
        else:
            result.append(r_seq.pop(0))
    if len(l_seq) > 0:
        result.extend(l_seq)
    if len(r_seq) > 0:
        result.extend(r_seq)
    return result

l = range(100)
random.shuffle(l)
print "Start with: ", l
print "---"
print "End with: ", sort(l)
