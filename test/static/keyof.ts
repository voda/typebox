import { Expect } from './assert'
import { Type } from '@sinclair/typebox'

{
  const K = Type.KeyOf(
    Type.Object({
      A: Type.Null(),
      B: Type.Null(),
      C: Type.Null(),
    }),
  )
  Expect(K).ToInfer<'A' | 'B' | 'C'>()
}

{
  const T = Type.Pick(
    Type.Object({
      A: Type.Null(),
      B: Type.Null(),
      C: Type.Null(),
    }),
    ['A', 'B'],
  )

  const K = Type.KeyOf(T)

  Expect(K).ToInfer<'A' | 'B'>()
}

{
  const T = Type.Omit(
    Type.Object({
      A: Type.Null(),
      B: Type.Null(),
      C: Type.Null(),
    }),
    ['A', 'B'],
  )

  const K = Type.KeyOf(T)

  Expect(K).ToInfer<'C'>()
}

{
  const T = Type.KeyOf(
    Type.Omit(
      Type.Object({
        A: Type.Null(),
        B: Type.Null(),
        C: Type.Null(),
      }),
      ['A', 'B'],
    ),
  )
  Expect(T).ToInfer<'C'>()
}
{
  {
    const A = Type.Object({ type: Type.Literal('A') })
    const B = Type.Object({ type: Type.Literal('B') })
    const C = Type.Object({ type: Type.Literal('C') })
    const Union = Type.Union([A, B, C])
    const Extended = Type.Object({
      x: Type.Number(),
      y: Type.Number(),
      z: Type.Number(),
    })
    const T = Type.Intersect([Union, Extended])

    const K1 = Type.KeyOf(T)

    Expect(K1).ToInfer<'type' | 'x' | 'y' | 'z'>()

    const P = Type.Omit(T, ['type', 'x'])

    const K2 = Type.KeyOf(P)

    Expect(K2).ToInfer<'y' | 'z'>()
  }
}
