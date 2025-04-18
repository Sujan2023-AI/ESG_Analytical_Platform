import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# === CONFIG ===
normalized_folder_path = "/Users/sujanbharadwaj/Documents/Ontology_PCA_Project/Normalized_Data"
intermediate_results_path = "//Users/sujanbharadwaj/Documents/Ontology_PCA_Project/Intermediate_Results"
os.makedirs(intermediate_results_path, exist_ok=True)

files_to_analyze = {
    "Semiconductors": "semiconductors_esg_consolidated.csv",
    "Biopharma": "biotechnology_and_pharmaceuticals_esg_consolidated.csv"
}

required_columns = ["company_name", "year", "metric_value", "pillar", "Industry", "metric_name"]

# === Utility Functions ===

def save_plot(fig, name):
    path = os.path.join(intermediate_results_path, name)
    fig.savefig(path, bbox_inches='tight')
    plt.close(fig)
    print(f"Saved: {path}")

def plot_top_companies(df, label):
    top = df["company_name"].value_counts().head(10)
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(y=top.index, x=top.values, ax=ax, palette="viridis")
    ax.set_title(f"Top 10 Companies – {label}")
    save_plot(fig, f"{label.lower()}_top_companies.png")

def plot_top_metrics(df, label):
    top = df["metric_name"].value_counts().head(10)
    fig, ax = plt.subplots(figsize=(10, 6))
    sns.barplot(y=top.index, x=top.values, ax=ax, palette="magma")
    ax.set_title(f"Top 10 ESG Metrics – {label}")
    save_plot(fig, f"{label.lower()}_top_metrics.png")

def plot_time_series(df, label):
    df["year"] = pd.to_numeric(df["year"], errors="coerce")
    df.dropna(subset=["year", "metric_value"], inplace=True)
    fig, ax = plt.subplots(figsize=(12, 6))
    sns.lineplot(data=df, x="year", y="metric_value", hue="Industry", marker="o", ax=ax)
    ax.set_title(f"Time Series Trend – {label}")
    save_plot(fig, f"{label.lower()}_time_series.png")

def plot_industry_boxplot(df, label):
    fig, ax = plt.subplots(figsize=(12, 6))
    sns.boxplot(data=df, x="Industry", y="metric_value", ax=ax, showfliers=False)
    ax.set_title(f"Industry-wise Distribution – {label}")
    plt.xticks(rotation=45)
    save_plot(fig, f"{label.lower()}_boxplot.png")

def plot_correlation_heatmap(df, label):
    df["year"] = pd.to_numeric(df["year"], errors="coerce")
    pivot = df.pivot_table(index="year", columns="metric_name", values="metric_value", aggfunc="mean")
    corr = pivot.corr().dropna(axis=0, how='all').dropna(axis=1, how='all')
    if corr.empty:
        return
    fig, ax = plt.subplots(figsize=(14, 8))
    sns.heatmap(corr, cmap="coolwarm", center=0, linewidths=0.5, ax=ax, cbar_kws={"shrink": 0.7})
    ax.set_title(f"Correlation Heatmap – {label}")
    save_plot(fig, f"{label.lower()}_correlation_heatmap.png")

# === Main Runner ===

def run_eda_visualization():
    for label, filename in files_to_analyze.items():
        file_path = os.path.join(normalized_folder_path, filename)
        print(f"\n📂 Processing: {label} – {filename}")

        if not os.path.exists(file_path):
            print(f" Missing: {file_path}")
            continue

        df = pd.read_csv(file_path, delimiter='|')
        missing = [col for col in required_columns if col not in df.columns]
        if missing:
            print(f"Missing columns in {filename}: {missing}")
            continue

        plot_top_companies(df, label)
        plot_top_metrics(df, label)
        plot_time_series(df, label)
        plot_industry_boxplot(df, label)
        plot_correlation_heatmap(df, label)

        print(f" Visualizations saved for {label}")

# === Entry Point ===
if __name__ == "__main__":
    run_eda_visualization()