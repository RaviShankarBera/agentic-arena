const WA_LINK="#community"; // TODO: replace with real WhatsApp Community invite link
const TRACKS=[
{id:"llm",icon:"✎",color:"#7c5cff",name:"LLM Response Evaluation",tag:"Judge answers like a pro",
 blurb:"Learn to score model answers for correctness, helpfulness, tone and instruction-following.",
 quests:[
 {t:"What makes an answer good?",lesson:"Check four things in order: did it follow the instruction, is it factually correct, is it complete, and is it clearly written. A fluent answer can still be wrong, so verify claims before you reward style.",q:"A reply is beautifully written but states a wrong date. How should it score on correctness?",o:["High, the style is great","Low, fluent but wrong","Skip it"],a:1},
 {t:"Rubrics and scoring scales",lesson:"A rubric turns opinion into repeatable scores. Define each score level with an example. Two evaluators using the same rubric should land within one point of each other.",q:"Why write examples for each score level?",o:["Looks professional","So different raters score the same way","To make it longer"],a:1},
 {t:"Catching hallucinations",lesson:"Hallucinations are confident claims with no source. Spot them by checking names, numbers, quotes and links. If you cannot verify it, flag it as unsupported rather than guessing.",q:"The model cites a paper you cannot find. What do you do?",o:["Trust it","Flag as unsupported","Rate it 5/5"],a:1}]},
{id:"annot",icon:"⌘",color:"#00c2a8",name:"Data Annotation & Labeling",tag:"Clean labels, strong models",
 blurb:"Labels are the ground truth models learn from. Learn guidelines, edge cases and quality checks.",
 quests:[
 {t:"Reading the guideline",lesson:"Every project has a guideline. Read it fully, note the edge cases, and when the guideline is silent, ask or follow the closest rule. Never invent your own labeling logic.",q:"The guideline does not cover a case. Best move?",o:["Make up a label","Ask or follow the closest rule","Skip silently"],a:1},
 {t:"Agreement and consistency",lesson:"Inter-annotator agreement measures how often raters pick the same label. Low agreement usually means the guideline is unclear, not that people are careless.",q:"Agreement is low. Most likely cause?",o:["Unclear guideline","Bad internet","Too many raters"],a:0},
 {t:"Quality checks and gold sets",lesson:"Gold items have known answers hidden inside your queue. Your accuracy on them tells the team how much to trust your other labels.",q:"What is a gold set used for?",o:["Paying bonuses only","Measuring label accuracy","Training the rater"],a:1}]},
{id:"vision",icon:"▣",color:"#ff7a59",name:"Image & Video Annotation",tag:"Boxes, masks and frames",
 blurb:"Bounding boxes, segmentation, keypoints and video tracking, done precisely.",
 quests:[
 {t:"Boxes vs masks",lesson:"Bounding boxes are fast and rough. Segmentation masks follow the object outline and are used when shape matters, like medical scans or self-driving.",q:"Which gives the tightest object outline?",o:["Bounding box","Segmentation mask","Caption"],a:1},
 {t:"Occlusion and edge cases",lesson:"Objects get partly hidden. Follow the guideline: usually you label the visible part and mark the object as occluded. Be consistent across frames.",q:"A car is half hidden by a bus. You...",o:["Skip it","Label it and mark occluded","Label the bus twice"],a:1},
 {t:"Tracking across video",lesson:"In video, one object keeps one ID across frames. Label keyframes, let interpolation fill the gaps, then scrub through and fix drift.",q:"Why keep the same ID across frames?",o:["Saves time only","Model learns the object is the same","Required by law"],a:1}]},
{id:"audio",icon:"♫",color:"#f5b301",name:"Audio & Speech",tag:"Listen, transcribe, judge",
 blurb:"Transcription, speaker labels and judging text-to-speech quality.",
 quests:[
 {t:"Transcription conventions",lesson:"Decide how to write fillers (um, uh), false starts and unclear audio. Mark unclear parts with a tag instead of guessing words.",q:"You cannot make out a word. You...",o:["Guess the likeliest word","Use the unclear tag","Delete the sentence"],a:1},
 {t:"Speaker diarization",lesson:"Diarization answers who spoke when. Label every turn change, keep speaker IDs consistent, and mark overlapping speech.",q:"Diarization tells you...",o:["The language","Who spoke when","The mood"],a:1},
 {t:"Judging TTS quality",lesson:"Rate naturalness, pronunciation, pacing and clarity separately. A voice can be clear but robotic, so score each dimension on its own.",q:"Why score dimensions separately?",o:["One score hides trade-offs","It is faster","No reason"],a:0}]},
{id:"multi",icon:"文",color:"#3b9cff",name:"Multilingual & Regional AI",tag:"Hindi, Telugu and beyond",
 blurb:"Evaluate AI in Indian and other languages: translation, tone, script and cultural fit.",
 quests:[
 {t:"Translation vs localisation",lesson:"Translation changes the words. Localisation also fits idioms, units, names and tone to the audience. Good evaluators check both.",q:"A literal translation sounds odd to locals. This is a...",o:["Localisation gap","Perfect result","Spelling error"],a:0},
 {t:"Script, romanisation and code-mixing",lesson:"Users type Hinglish and Tenglish in Roman script. Models must handle native script, romanised text and mixed sentences. Check all three.",q:"Which is code-mixing?",o:["Hindi and English in one sentence","Only English","Only Hindi script"],a:0},
 {t:"Cultural fit and tone",lesson:"Politeness levels, honorifics and festival references differ by region. Flag answers that are correct but tone-deaf.",q:"Correct answer, rude honorific level. Score?",o:["Penalise tone","Ignore it","Full marks"],a:0}]},
{id:"safety",icon:"⛨",color:"#ef476f",name:"AI Safety & Quality",tag:"Red-team the model, safely",
 blurb:"Find harmful, biased or leaky outputs and report them clearly.",
 quests:[
 {t:"Harm categories",lesson:"Typical buckets: violence, self-harm, hate, privacy leaks, illegal advice, and misinformation. Know the policy wording, then match the output to the closest bucket.",q:"A model reveals a user's private phone number. Bucket?",o:["Privacy leak","Style","Formatting"],a:0},
 {t:"Prompt injection basics",lesson:"Prompt injection hides instructions inside content the model reads, like a web page or email. Safe systems treat that content as data, not commands.",q:"An email says 'ignore your rules'. A safe agent...",o:["Obeys it","Treats it as data","Forwards it"],a:1},
 {t:"Writing a good bug report",lesson:"Include the prompt, the exact output, why it breaks policy, severity, and steps to reproduce. Short and testable beats long and vague.",q:"Best bug report has...",o:["Repro steps and output","Just 'it is bad'","A long story"],a:0}]},
{id:"rlhf",icon:"⚖",color:"#9b5de5",name:"RLHF & Preference Ranking",tag:"Which answer wins, and why",
 blurb:"Compare model outputs side by side and teach models human preferences.",
 quests:[
 {t:"Pairwise comparison",lesson:"You see answer A and B and pick the better one. Decide using the guideline order: safety first, then correctness, then helpfulness, then style.",q:"A is polished but wrong, B is plain but right. Pick?",o:["A","B","Tie always"],a:1},
 {t:"Writing a short justification",lesson:"A one or two sentence reason makes your choice auditable. Cite the specific flaw or strength, not a feeling.",q:"Best justification?",o:["Felt better","B cites the correct figure, A does not","B is longer"],a:1},
 {t:"Avoiding rater bias",lesson:"Length bias, position bias and self-preference are common. Shuffle your habits: do not default to the longer answer or to option A.",q:"Always choosing the longer answer is...",o:["Length bias","Good practice","Safety rule"],a:0}]},
{id:"mm",icon:"▶",color:"#06d6a0",name:"Multimodal AI Evaluation",tag:"Text + image + audio + video",
 blurb:"Judge models that see and hear: captions, VQA, charts and video understanding.",
 quests:[
 {t:"Grounding in the image",lesson:"A good caption describes what is actually visible. If the model mentions objects that are not in the image, that is a grounding error.",q:"Caption mentions a dog; none is in the photo. This is...",o:["Grounding error","Creative style","Correct"],a:0},
 {t:"Chart and document QA",lesson:"Check the number the model reads off the chart, the axis, and the units. Small misreads cascade into wrong conclusions.",q:"First thing to verify in chart QA?",o:["Colour theme","Value, axis and units","Font"],a:1},
 {t:"Video understanding",lesson:"Check order of events, who did what, and timing. Models often summarise the whole clip from one frame, so test details from different moments.",q:"A model describes only frame 1. Issue?",o:["Missing temporal coverage","None","Too detailed"],a:0}]},
{id:"agent",icon:"◎",color:"#ff5da2",name:"Agentic AI & GUI Evaluation",tag:"Do agents finish the job?",
 blurb:"Evaluate agents that click, type, call tools and complete multi-step tasks.",
 quests:[
 {t:"Task success vs process",lesson:"Did the agent reach the goal, and did it get there safely and efficiently? Score outcome, steps taken, wrong clicks and any risky action separately.",q:"Goal reached, but it deleted extra files. Result?",o:["Full success","Penalise the unsafe step","Ignore"],a:1},
 {t:"Reading an agent trace",lesson:"A trace lists thoughts, tool calls and results. Find the first wrong step; later errors often come from it.",q:"Where to look first in a failed trace?",o:["Last step","First wrong step","Random step"],a:1},
 {t:"Designing a GUI test task",lesson:"Write the goal, start state, allowed tools and a checkable end state. If a script cannot verify success, the task is too vague.",q:"A good task has a...",o:["Checkable end state","Long story","No goal"],a:0}]}
];
const ROADMAPS=[
{name:"Beginner to AI Evaluator",weeks:"4 weeks",steps:["Week 1: Learn the basics of how LLMs answer","Week 2: Practise rubrics and scoring","Week 3: Do 20 mock comparisons","Week 4: Build a 1-page evaluator profile"]},
{name:"Annotator to Specialist",weeks:"6 weeks",steps:["Weeks 1-2: Text and image labeling","Weeks 3-4: Pick audio, video or a language","Weeks 5-6: QA, gold sets, a portfolio","Apply for domain projects"]},
{name:"Evaluator to Agent Tester",weeks:"8 weeks",steps:["Weeks 1-2: Evaluation fundamentals","Weeks 3-4: Tools, traces and logs","Weeks 5-6: Safety and injection testing","Weeks 7-8: Design and run a GUI task suite"]}];
const PROJECTS=[
{lvl:"Starter",t:"Mini rubric for chatbot answers",d:"Write a 5-point rubric and score 20 answers from any free chatbot. Share a sheet with your scores and notes."},
{lvl:"Starter",t:"Label 100 images",d:"Use a free tool (Label Studio) to box 100 images and measure your own consistency."},
{lvl:"Builder",t:"Hindi vs English answer comparison",d:"Ask the same 15 questions in both languages, then score correctness, tone and script handling."},
{lvl:"Builder",t:"Hallucination spotter sheet",d:"Collect 25 model claims, verify each against sources, and tag the error type."},
{lvl:"Pro",t:"Agent trace review report",d:"Run a free agent on 10 tasks, find the first wrong step in each failure, and write a short report."},
{lvl:"Pro",t:"Prompt-injection test pack",d:"Create 15 safe injection tests for a document-reading bot, log the results, and propose fixes."}];
const USECASES=[
{t:"Customer support bot",d:"Evaluators score answers for policy accuracy and tone before launch, so refunds and warranties are never misquoted."},
{t:"Medical record assistant",d:"Annotators label drug names and dosages. Evaluators check that summaries never drop a warning."},
{t:"Regional language assistant",d:"Native speakers check translation, honorifics and Hinglish so the bot sounds natural, not robotic."},
{t:"Self-driving perception",d:"Image and video annotators draw boxes and masks, with strict rules for occluded objects."},
{t:"Browser agents",d:"Testers run agents through real web tasks and score success, wasted steps and risky clicks."},
{t:"Voice assistants",d:"Audio raters judge naturalness, pronunciation and pacing across accents."}];
const PROBLEMS=[
{t:"A support bot says 'refunds in 3 days' but policy says 7. Which score fits and why?",h:"Correctness is the first check."},
{t:"Two answers: A is long and friendly, B is short and exact. Write a two-line justification.",h:"Avoid length bias."},
{t:"An agent finished the booking but entered a wrong phone number. Success or fail?",h:"Outcome vs process."}];
const REAL=[
{t:"Raters disagree on 'helpful'",d:"Fix: add 3 anchored examples per score and re-calibrate weekly."},
{t:"Gold set leaked to annotators",d:"Fix: rotate gold items and track accuracy drift per person."},
{t:"Agent passes on retry luck",d:"Fix: run each task 3 times and report pass rate, not a single run."},
{t:"Translation fine, tone wrong",d:"Fix: add a separate tone score and a native-reviewer pass."}];
