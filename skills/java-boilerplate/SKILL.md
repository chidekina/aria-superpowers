---
name: java-boilerplate
description: "Gera automaticamente getters, setters, construtores, toString, equals e hashCode para classes Java. Triggers on: /java-boilerplate, 'gerar métodos java', 'criar getters setters'."
user-invocable: true
tags: [java, boilerplate, getters, setters, poo]
requires: []
---

# Java Boilerplate

Analisa uma classe Java e gera automaticamente todos os métodos boilerplate necessários.

---

## Uso

```
/java-boilerplate                  # Gera getters e setters para todos os campos
/java-boilerplate --construtor     # Inclui construtor com todos os campos
/java-boilerplate --completo       # Gera tudo: getters, setters, construtores, toString, equals e hashCode
/java-boilerplate --lombok         # Sugere as annotations Lombok equivalentes
```

## O que ela faz

- **Passo 1:** Lê a classe Java fornecida e identifica todos os atributos (campos) declarados, seus tipos e modificadores de acesso.
- **Passo 2:** Gera os métodos `get` e `set` para cada campo não-final, seguindo as convenções JavaBeans (ex: `getNome()`, `setNome(String nome)`).
- **Passo 3:** Se solicitado, gera o construtor padrão (sem argumentos) e o construtor completo (com todos os campos).
- **Passo 4:** Se solicitado com `--completo`, gera também `toString()` formatado, `equals()` e `hashCode()` baseados nos campos da classe.
- **Passo 5:** Retorna o código pronto para ser colado na classe, organizado na ordem convencional Java: construtores → getters/setters → toString → equals → hashCode.
- **Passo 6 (opcional):** Com `--lombok`, exibe as annotations equivalentes (`@Getter`, `@Setter`, `@Data`, etc.) como alternativa mais enxuta.

---

## Exemplo

**Prompt:**
> /java-boilerplate --completo
>
> ```java
> public class Produto {
>     private Long id;
>     private String nome;
>     private Double preco;
>     private Integer estoque;
> }
> ```

**O Claude vai:**

1. Identificar os campos: `id` (Long), `nome` (String), `preco` (Double), `estoque` (Integer)
2. Gerar construtor padrão e construtor completo
3. Gerar `getId()`, `setId()`, `getNome()`, `setNome()`, `getPreco()`, `setPreco()`, `getEstoque()`, `setEstoque()`
4. Gerar `toString()` com todos os campos
5. Gerar `equals()` e `hashCode()` baseados no `id`
6. Entregar o código completo pronto para uso:

```java
// Construtor padrão
public Produto() {}

// Construtor completo
public Produto(Long id, String nome, Double preco, Integer estoque) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
}

// Getters e Setters
public Long getId() { return id; }
public void setId(Long id) { this.id = id; }

public String getNome() { return nome; }
public void setNome(String nome) { this.nome = nome; }

public Double getPreco() { return preco; }
public void setPreco(Double preco) { this.preco = preco; }

public Integer getEstoque() { return estoque; }
public void setEstoque(Integer estoque) { this.estoque = estoque; }

// toString
@Override
public String toString() {
    return "Produto{" +
        "id=" + id +
        ", nome='" + nome + '\'' +
        ", preco=" + preco +
        ", estoque=" + estoque +
        '}';
}

// equals e hashCode
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Produto produto = (Produto) o;
    return Objects.equals(id, produto.id);
}

@Override
public int hashCode() {
    return Objects.hash(id);
}
```

---

## Regras e convenções seguidas

- Nomes de métodos seguem o padrão **JavaBeans** (`get`/`set` + nome com inicial maiúscula)
- Campos do tipo `boolean` usam prefixo `is` no getter (ex: `isAtivo()`)
- Campos `final` recebem apenas getter, sem setter
- `equals` e `hashCode` são gerados preferencialmente com base no campo `id` ou na chave natural da entidade
- O código gerado é compatível com **Java 8+**
- Imports necessários (como `java.util.Objects`) são incluídos quando necessário
