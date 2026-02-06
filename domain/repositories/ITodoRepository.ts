import { Todo } from '../entities/Todo';

/**
 * Todoの参照系インターフェース
 * ドメイン層で定義し、インフラストラクチャ層で実装する
 */
export interface TodoQueryRepository {
  /**
   * すべてのTodoを取得
   */
  findAll(): Promise<Todo[]>;

  /**
   * IDでTodoを取得
   */
  findById(id: string): Promise<Todo | null>;

  /**
   * 完了状態でフィルタリング
   */
  findByCompletionStatus(completed: boolean): Promise<Todo[]>;
}

/**
 * Todoの更新系インターフェース
 * ドメイン層で定義し、インフラストラクチャ層で実装する
 */
export interface TodoCommandRepository {
  /**
   * Todoを作成
   */
  create(todo: Todo): Promise<Todo>;

  /**
   * Todoを更新
   */
  update(todo: Todo): Promise<Todo>;

  /**
   * Todoを削除
   */
  delete(id: string): Promise<void>;
}

/**
 * 参照・更新の両方を扱う場合の合成型
 */
export type TodoRepository = TodoQueryRepository & TodoCommandRepository;


