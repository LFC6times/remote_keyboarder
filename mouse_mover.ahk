stdin := FileOpen("*", "r `n")
stdout := FileOpen("*", "w `n")

query := RTrim(stdin.ReadLine(), "`n")

Array := Array()

Loop, Parse, query, `,
{
    Array.Push(%A_LoopField%)
}

MouseMove, Array[1], Array[2], 50, R