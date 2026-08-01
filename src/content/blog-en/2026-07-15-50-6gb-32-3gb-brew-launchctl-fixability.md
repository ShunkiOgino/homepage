---
title: "From 50.6GB to 32.3GB Memory: Bypassing brew's Management Refusal with launchctl to Pursue 'Fixability' in Local AI"
date: 2026-07-15
description: "I reduced memory usage from 50.6GB to 32.3GB by rewriting controls to launchctl and implementing port monitoring after brew refused management. This kind of gritty control is the greatest significance of running AI on your own hardware."
tags: []
draft: true
src_hash: eaed0cbc1565
---

I reduced memory usage from 50.6GB to 32.3GB by rewriting controls to launchctl and implementing port monitoring after brew refused management. This kind of gritty control is the greatest significance of running AI on your own hardware.

You might think that using cloud-based RAG (Retrieval-Augmented Generation) for the sake of convenience is more efficient. Systems like Gemini-in-Drive are comfortable. However, when you become dissatisfied with the information extraction accuracy (recall), there is nothing you can do in a cloud environment. The internal structure is a black box, making it impossible for the user to make improvements.

I deliberately choose self-hosting to avoid this "helpless state." What I prioritize is "fixability." For example, if accuracy is lacking, I can approach the problem directly—by replacing a chunker (the process of splitting text for search) from RecursiveCharacterTextSplitter to a semantic-based OSS, or by switching the embedding model (the model that vectorizes text) to one that is more specialized. I believe that maintaining a state where I can personally fix bugs or low accuracy is the correct answer for long-term operation.

Of course, local operation comes with the challenge of resource management. At one point, ComfyUI (44GB) for full video rendering and oMLX (53GB) were coexisting, causing memory swap to tighten and the system to scream. Upon investigation, I found that while the evacuation mechanism was calling brew services, oMLX was refusing management, causing the process to silently become a no-op (a miss).

To solve this, I rewrote the control to launchctl's bootstrap/bootout and changed the mechanism to determine operation based on whether port 8080 was open. As a result, evacuation and reloading functioned normally, and oMLX's memory usage shrank from 50.6GB to 32.3GB.

Do you relinquish control for the sake of "convenience," or do you accept management costs for the sake of "fixability"? Just as I broke through the wall of brew's no-op with launchctl and shaved memory down from 50.6GB to 32.3GB, I want to place value on a design that regains control by concretely crushing the points of restriction.

The "restriction" you feel right now—the sense that you are being used by your tools—might just be a side effect of having entrusted your control to an external party.
