import json
import random

result = []

for i in range(1000):
    sublist = []

    current_id = i
    priority = random.randint(0, 1000)
    family_type = random.randint(0, 100)
    ms1 = random.randint(0, 10)
    start_time_s1 = random.randint(0, 500)
    finish_time_s1 = random.randint(500, 1000)
    process_s1 = start_time_s1 + finish_time_s1
    ms2 = random.randint(0, 10)
    start_time_s2 = random.randint(0, 500)
    finish_time_s2 = random.randint(500, 1000)
    process_s2 = start_time_s2 + finish_time_s2
    ms3 = random.randint(0, 10)
    start_time_s3 = random.randint(0, 500)
    finish_time_s3 = random.randint(500, 1000)
    process_s3 = start_time_s3 + finish_time_s3
    ms4 = random.randint(0, 10)
    start_time_s4 = random.randint(0, 500)
    finish_time_s4 = random.randint(500, 1000)
    process_s4 = start_time_s4 + finish_time_s4
    overall_processing_time = process_s1 + process_s2 + process_s3 + process_s4
    overall_waiting_time = 5000 - overall_processing_time
    tardiness = random.randint(0, 1)
    ignore = random.randint(0, 1)

    sublist.append(current_id)
    sublist.append(priority)
    sublist.append(family_type)
    sublist.append(ms1)
    sublist.append(start_time_s1)
    sublist.append(finish_time_s1)
    sublist.append(process_s1)
    sublist.append(ms2)
    sublist.append(start_time_s2)
    sublist.append(finish_time_s2)
    sublist.append(process_s2)
    sublist.append(ms3)
    sublist.append(start_time_s3)
    sublist.append(finish_time_s3)
    sublist.append(process_s3)
    sublist.append(ms4)
    sublist.append(start_time_s4)
    sublist.append(finish_time_s4)
    sublist.append(process_s4)
    sublist.append(overall_processing_time)
    sublist.append(overall_waiting_time)
    sublist.append(tardiness)
    sublist.append(ignore)

    result.append(sublist)


with open('example_results_timeline.json', 'w') as f:
    json.dump(result, f)