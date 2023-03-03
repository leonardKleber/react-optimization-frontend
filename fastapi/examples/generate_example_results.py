import json
import random

result = []

for i in range(100):
	makespan = 10 * i + random.randint(10000, 15000)
	t_tardiness = int(i / 10) + random.randint(500, 1000)
	penalties = int(i / 100) + random.randint(0, 10)
	m_s_s1 = int(i / 100) + random.randint(0, 100)
	m_s_s2 = int(i / 100) + random.randint(0, 100)

	sub_list = [[makespan, t_tardiness, penalties, m_s_s1, m_s_s2], []]

	result.append(sub_list)

with open('example_results.json', 'w') as f:
    json.dump(result, f)