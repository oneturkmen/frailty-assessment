import pandas as pd

# Reads both (frail and non-frail) data as a tuple
def create_new_csv():
  # Read
  frail_data = pd.read_csv("frailfakedata.csv")
  non_frail_data = pd.read_csv("goodfakedata.csv")

  # Update
  frail_data['is_user_ok'] = [0 for i in range(frail_data.shape[0])]
  non_frail_data['is_user_ok'] = [1 for i in range(non_frail_data.shape[0])]

  all_data = pd.concat([frail_data, non_frail_data])

  # Pizdecify
  all_data.to_csv('fakedata.csv', encoding='utf-8', index=False)


create_new_csv()