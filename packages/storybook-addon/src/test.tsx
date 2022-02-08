import React, { FC, ComponentType } from 'react'

type StylesChunk = any

type SteelyFC<T extends {}, U extends {}, D extends {}> = ComponentType<T> & {
  __options?: Options<U, D>
  __component?: ComponentType
}

type VariantProps<T extends {}> = {
  [K in keyof T]: keyof T[K]
}

type SafeUnionType<P, C> = P extends keyof C ? C[P] : never

type DeepUnion3<T1, T2, T3> = {
  [P in keyof (T1 & T2 & T3)]: SafeUnionType<P, T1> | SafeUnionType<P, T2> | SafeUnionType<P, T3>
}

// type WithVariants<P extends {}, V extends {}, PV extends {}, D = {}> = 
//   DeepUnion3<P, V, PV>;
  // Omit<P, keyof PV> & VariantProps<DeepUnion2<V, PV>>,

type WithVariants<P extends {}, V extends {}, PV extends {}, D = {}> = Defaultize<
  Omit<P, keyof PV> & VariantProps<V & PV>,
  D
>
interface a {
    variant: 'kind'
  }

  interface b {
    variant: 'kind2'    
  }
type OMIT = {
    [P in keyof (a & b)]: string
  }
type VTEST = WithVariants<{ p: true }, { variant: 'test' }, { variant: 'test0' }>

const a: OMIT  = {
  variant: 'asd',
  log: true
}

type Variants = Record<string, Record<string, StylesChunk>>

type Defaultize<T extends {}, D extends {}> = keyof D extends keyof T
  ? { [P in keyof D]?: T[P] } & Omit<T, keyof D>
  : never

interface Options<T extends {}, D extends {}> {
  variants?: T
  displayName?: string
  defaultProps?: D
  styles?: StylesChunk[]
}

export function component<
  P,
  V extends {},
  PV extends {},
  D extends Partial<WithVariants<P, V, PV>>,
>(
  WrappedComponent: SteelyFC<P, PV, D>,
  options?: Options<V, D>,
  // TODO: Тут можно переписать без первого omit'а (для самого первого случая)
  // V extends never ? <without-omit> : <omit>
): SteelyFC<WithVariants<P, V, PV, D>, V & PV, D> {
  const Component = WrappedComponent.__component ?? WrappedComponent
  const prevOptions = WrappedComponent.__options ?? {}

  const variants = mergeVariants(prevOptions.variants ?? {}, options?.variants ?? {})
  const styles = [...(prevOptions?.styles || []), ...(options?.styles || [])]

  const SteelyComponent = (props: any) => {
    const unsafe_styles = []

    if (styles.length > 0) {
      // const styleList = Array.isArray(styles) ? styles : [styles];
      unsafe_styles.push(...styles)
    }

    // TODO: тут if всегда будет работать, надо что-то подумать над этим
    if (variants) {
      for (const key of Object.keys(variants)) {
        if (props[key]) {
          const variantCase = variants[key][props[key]]

          if (!variantCase) {
            // TODO: only for dev invariant
            throw new Error(
              `Variant case not found ${key} -> ${props[key]} (${options?.displayName})`,
            )
          }

          unsafe_styles.push(variantCase)
        }
      }
    }

    // eslint-disable-next-line camelcase
    return <Component {...props} unsafe_styles={unsafe_styles} />
  }

  const displayName = options?.displayName ?? WrappedComponent.displayName ?? 'Component'

  SteelyComponent.displayName = `Steely(${displayName})`
  SteelyComponent.defaultProps = options?.defaultProps

  SteelyComponent.__options = { styles, variants }
  SteelyComponent.__component = Component

  return SteelyComponent as any
}

// TODO: create merge options fn
function mergeVariants(a: Variants, b: Variants): Variants {
  const variants: Variants = {}
  const keys = ([] as string[]).concat(Object.keys(a), Object.keys(b))

  for (const key of keys) {
    variants[key] = {}

    if (a[key]) Object.assign(variants[key], a[key])
    if (b[key]) Object.assign(variants[key], b[key])
  }

  return variants
}

declare const UnstyledButton: FC<{ type: 'button' | 'submit' | 'reset' }>

const Button = component(UnstyledButton, {
  defaultProps: {
    kind: 'default',
    type: 'submit',
    size: 'm',
  },
  variants: {
    kind: {
      default: '',
      primary: '',
    },
    size: {
      m: '',
    },
  },
})

// TODO: Dirty fix was used here to resolve issues with types
const Danger = component(Button, {
  defaultProps: {
    kind: 'default',
    type: 'submit',
    size: 'm'
  },
  variants: {
    kind: {
      danger: '',
    },
  },
})

const Danger1 = component(Button, {
  defaultProps: {
    kind: 'default',
    type: 'submit',
    size: 'm'
  },
  variants: {
    kind: {
      danger: '',
    },
  },
})

const Danger2 = component(Button, {
  defaultProps: {
    kind: 'default',
    type: 'submit',
    size: 'm'
  },
  variants: {
    kind: {
      danger: '',
    },
  },
})


const render = (
  <>
    <Button />
    <Button type="button" />
    <Button kind="primary" />
    <Button type="button" kind="default" />
  </>
)
