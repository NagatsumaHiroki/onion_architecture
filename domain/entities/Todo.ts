/**
 * Todoエンティティ
 * ドメイン層のコアモデル
 */
export class Todo {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public completed: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  /**
   * Todoを完了状態にする
   */
  complete(): void {
    this.completed = true;
    this.updatedAt = new Date();
  }

  /**
   * Todoを未完了状態にする
   */
  uncomplete(): void {
    this.completed = false;
    this.updatedAt = new Date();
  }

  /**
   * Todoのタイトルを更新する
   */
  updateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('タイトルは必須です');
    }
    this.title = title;
    this.updatedAt = new Date();
  }

  /**
   * Todoの説明を更新する
   */
  updateDescription(description: string | null): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  /**
   * ファクトリーメソッド：新規Todoを作成
   */
  static create(title: string, description: string | null = null): Todo {
    if (!title || title.trim().length === 0) {
      throw new Error('タイトルは必須です');
    }

    return new Todo(
      crypto.randomUUID(),
      title,
      description,
      false,
      new Date(),
      new Date()
    );
  }

  /**
   * 既存データからTodoエンティティを復元
   */
  static fromPersistence(data: {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): Todo {
    return new Todo(
      data.id,
      data.title,
      data.description,
      data.completed,
      data.createdAt,
      data.updatedAt
    );
  }
}

