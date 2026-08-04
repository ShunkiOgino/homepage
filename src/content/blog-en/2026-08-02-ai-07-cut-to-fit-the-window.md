---
title: "Cutting Work to Fit the Window"
date: 2026-08-02
description: "Instead of dealing with overflow after it happens, allocate work into sizes that won't overflow. The size of the window, not the desired unit of handling, determines how to cut."
tags: ["Reflections"]
draft: false
src_hash: 2f84e8edfd53
---

Artificial intelligence that writes text is called a Large Language Model. In English, it's an LLM. OpenAI's GPT, Google's Gemini, and Anthropic's Claude fall into this category. Hereafter, I will call them "models."

There is a limit to the amount of information a model can read at once. This is what's called the "window." Since anything that overflows simply vanishes in silence, trying to deal with it after it has overflowed is a losing game.

First, you allocate the work into sizes that will not overflow.

## The unit you want to handle and the unit that fits are different

When I built a system to generate descriptions for videos I'd made, my first thought was to pass them in batches by platform. Since things posted to the same place are related, I figured providing them as a group would result in better descriptions.

I stopped. Because they wouldn't fit.

Instead, I cut them by individual work. I pass them one by one and have the model write them one by one. My judgment that reading them in batches would be better hasn't changed. However, the "better" way of cutting didn't fit.

A similar thing happened with summarizing logs. Work records are inherently connected. Since today is a continuation of yesterday, cutting by the day breaks the narrative. Even so, I cut by the day. This is because if you carry things over across days, they pile up for two or three days, and eventually, they will inevitably overflow.

The unit you want to handle and the unit that fits in the window rarely align. And when they don't, the window wins.

## Conditions for a non-overflowing cut

It's not enough to simply cut. Two things are required.

First: each cut piece must hold meaning on its own. If it's a single work, you can understand what the story is just by looking at that one video. A single day's log allows you to track what was done on that day. Conversely, if you mechanically cut text every 3,000 characters, the story is interrupted at the break, and neither fragment becomes readable.

Second: you must know what is being dropped at the boundary of the cut. If you cut by day, the continuity from the previous day is dropped. If you cut by work, the relationship between works is dropped. The act of dropping cannot be avoided. What can be avoided is remaining unaware that something was dropped.

Therefore, when deciding how to cut, you also decide what is being discarded by that method. Then, if a situation arises where the discarded information is necessary, you provide it separately for that specific instance.

## Even if larger windows arrive, I will do the same

Windows are getting larger every year. If that's the case, won't we eventually reach a point where we don't have to cut?

I don't think so.

There are two reasons. One is that the larger the window, the more expensive it becomes. If the length doubles, the combinations to be looked at quadruple. Just because it fits doesn't mean you should put it in; doing so makes it slower and more expensive.

The other reason is that just because something is put in doesn't mean it's read. Suppose there are 100,000 characters in the window, and only 2,000 of them are needed for the answer. The remaining 98,000 characters may be a hindrance, but they aren't a help. Just as when asking a human, attaching a massive amount of irrelevant material does not increase accuracy.

The way larger windows make things easier is not that we can stop cutting. It's that the damage caused when we cut incorrectly becomes smaller.

## Whether it overflows is decided by design

To summarize, the order is as follows:

First, decide what constitutes a single "turn." Verify if that one turn fits in the window. If it doesn't, make the unit one step smaller. As a result of making it smaller, write down what is being dropped. Prepare an exceptional way of passing information only for the moments when those dropped elements become necessary.

Whether it overflows is not something you discover while using the system; it is something you decide at the start.
