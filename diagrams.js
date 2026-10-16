const RMX=[
{stats:[["4","weeks to first gig"],["20","mock comparisons"],["1","evaluator profile"]],skills:["Rubrics","Scoring","Fact checks","Clear notes","Bias spotting"],tools:["Free chatbots","Google Sheets","Notion","Label Studio"],icons:["◎","✎","⚖","★"]},
{stats:[["6","weeks to specialist"],["4","data types"],["95%","target QA score"]],skills:["Text labels","Image boxes","Audio notes","Gold sets","QA review"],tools:["Label Studio","CVAT","Audacity","Google Sheets"],icons:["✎","▣","♪","⚑"]},
{stats:[["8","weeks to agent tester"],["3","safety test types"],["1","full GUI task suite"]],skills:["Traces","Logs","Injection tests","Task design","Failure triage"],tools:["Browser DevTools","Playwright","LangSmith free tier","GitHub"],icons:["◎","⌘","⚠","⚙"]}];
const UCX=[
{f:[["☰","Chat logs"],["✎","Score policy"],["⚖","Tone gate"],["✔","Safe launch"]],s:["98%","policy accuracy"]},
{f:[["☰","Medical notes"],["✎","Label drugs"],["⚠","Warning check"],["✔","Safe summary"]],s:["0","dropped warnings"]},
{f:[["☰","Local queries"],["✎","Native review"],["⚖","Honorific gate"],["✔","Natural reply"]],s:["10+","languages"]},
{f:[["▣","Road video"],["✎","Boxes and masks"],["⚠","Occlusion rules"],["✔","Clean dataset"]],s:["99%","label match"]},
{f:[["◎","Web tasks"],["⌘","Run the agent"],["⚠","Risky click gate"],["✔","Scored run"]],s:["3","metrics tracked"]},
{f:[["♪","Voice clips"],["✎","Transcribe"],["⚖","Accent gate"],["✔","Clear voice bot"]],s:["5","accents covered"]}];
const PIPE=[
{band:"THE DATA",nodes:[["☰","Collect","Gather text, images, audio and video. Check that the data is legal to use and is varied."],["◈","Clean","Remove duplicates, spam and private details before anyone labels it."]]},
{band:"THE HUMAN LAYER",nodes:[["✎","Annotate","People label the data using clear rules. Gold examples keep everyone consistent."],["⚖","Evaluate","People compare model answers with a rubric and give scores with reasons."],["⌘","Agent test","People run agents on real tasks and score success, wasted steps and risky actions."]]},
{band:"THE QUALITY GATES",nodes:[["⚑","Review","A second person checks a sample. Disagreements go to a lead."],["⚠","Safety","Test for harmful output and prompt injection before release."]]},
{band:"THE OUTCOME",nodes:[["✔","Ship","A model or agent that is measured, owned and safe to launch."],["↻","Learn","Failures become new test cases. The loop starts again."]]}];
