---
title: "The Inability to Do Math Won't Be Fixed"
date: 2026-08-02
description: "Making mistakes in multiplication isn't a lack of intelligence. Carrying digits is a procedural task that exists outside the act of arranging words by probability. Therefore, it won't disappear even as models grow larger."
tags: ["Reflections"]
draft: false
src_hash: 456deeb3e37d
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's written as LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will refer to them as "models."

They can write complex essays, yet they fail at four-digit multiplication. Despite how famous this gap is, the reason behind it isn't explained very often.

It is not a question of intelligence. It is a matter of how they are built.

## Numbers are just sequences of tokens

A model receives a string and returns a string. Numbers are merely part of that string.

When we pass a number, we cannot see how the model segments it. Furthermore, that segmentation is inconsistent.

There is a commonly cited example: "480" might be treated as a single chunk, while "481" is split into "4" and "81." Even though the numbers are adjacent, the break points differ. This is because the way they are segmented depends on how often that specific sequence appears in the world, having nothing to do with the properties of the number itself.

As a result, it is impossible to create the vertical alignment required for long multiplication. The ones place and the ones place do not align in a consistent format.

In other words, to a model, "3742" is not the quantity three thousand seven hundred forty-two. It is simply a sequence of symbols that often appear together.

## Long multiplication is a procedure

If you recall how to do long multiplication, the process isn't about arranging symbols.

You multiply starting from the ones place, remember the carry-over, and add it to the next digit. You shift the digits as you write. Finally, you sum them vertically. There is a value that must be held in memory throughout the process, handled in a specific order.

This action of "remembering and using it next" does not exist within a mechanism that arranges words based on probability. All that exists is the action of selecting the symbol most likely to come next.

Therefore, the model isn't "doing" long multiplication. It is selecting a number that *looks* like the answer to a multiplication problem.

## Familiar equations are correct

This explains their actual behavior.

12×12 is usually correct because it is a common sequence. The probability that the answer "144" follows that equation is very high. It's closer to memorization.

With four-digit numbers, they fail. Because those specific equations rarely appear in the world, there is no way to memorize the sequence of the answer. Instead, a number with a plausible number of digits is produced. Often, the leading digits are correct while the trailing digits are wrong. This happens because the leading digits can be guessed from the approximate magnitude, but the trailing digits cannot be determined without carrying the values all the way to the end.

Moreover, the failure isn't apparent in the presentation. The lack of certainty doesn't show up in the output. A wrong eight-digit number appears with the same confidence as "144."

## Scaling won't fix it

I believe this is the crucial point.

This is not the kind of flaw that will be fixed simply by making the model larger. Scaling increases the range of common equations it can get right, but it doesn't change *how* it gets them right. It is still just selecting a number that looks like the answer.

Because the cause is the absence of a place to execute procedures within the mechanism, the root cause remains unmoved.

## Improving results just by changing segmentation

There is one piece of evidence that this is a structural issue.

In 2024, two researchers named Xin and Strauss showed that simply changing how numbers are segmented—splitting them from right to left—increased the accuracy of calculations by over 22 percentage points.

They didn't change the model. They didn't make it larger. They didn't retrain it. They simply aligned the way numbers are split with the direction of long multiplication.

When they left the "intelligence" side alone and tweaked the "arrangement" side, it worked. The place where it worked is the place where the cause lies.

## The solution: Moving it outside

Therefore, the solution is already decided: perform the calculation outside the model.

Most tools now do this automatically. The model writes a mathematical expression, an external program executes it, and the result is returned. What the model did was not calculation, but writing a formula. Since code is text, that is a task it excels at.

Asking the model to write out the intermediate steps also helps slightly. By forcing it to write digit by digit, the amount of information it must decide at once is reduced. However, since those intermediate steps are also chosen by probability, they provide no guarantee.

## How to spot similar flaws

Similar flaws exist elsewhere.

Counting. Sorting. Tallying quantities. Processing things in a specific order. All of these are procedures that require maintaining an intermediate state, which is fundamentally different from the action of choosing what comes next.

When asking for this kind of work, it's best not to rely on the model, no matter how "intelligent" it is. It isn't that it lacks intelligence; it's that those specific operations are not built-in.

And for things that aren't built-in, the only option is to add them from the outside.
