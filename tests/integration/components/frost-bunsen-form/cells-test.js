import {expect} from 'chai'

import {
  expectTextInputWithState,
  findTextInputs
} from 'dummy/tests/helpers/ember-frost-core'

import selectors from 'dummy/tests/helpers/selectors'
import {setupFormComponentTest} from 'dummy/tests/helpers/utils'
import {describe, it} from 'mocha'

[
  {
    cells: [
      {
        model: 'foo'
      }
    ],
    type: 'form',
    version: '2.0'
  },
  {
    cellDefinitions: {
      foo: {
        model: 'foo'
      }
    },
    cells: [
      {
        extends: 'foo'
      }
    ],
    type: 'form',
    version: '2.0'
  },
  {
    cells: [
      {
        children: [
          {
            model: 'foo'
          }
        ]
      }
    ],
    type: 'form',
    version: '2.0'
  },
  {
    cellDefinitions: {
      foo: {
        model: 'foo'
      }
    },
    cells: [
      {
        children: [
          {
            extends: 'foo'
          }
        ]
      }
    ],
    type: 'form',
    version: '2.0'
  },
  {
    cellDefinitions: {
      foo: {
        children: [
          {
            model: 'foo'
          }
        ]
      }
    },
    cells: [
      {
        extends: 'foo'
      }
    ],
    type: 'form',
    version: '2.0'
  }
]
  .forEach((bunsenView) => {
    describe('Integration: Component / frost-bunsen-form / cells', function () {
      const ctx = setupFormComponentTest({
        bunsenModel: {
          properties: {
            foo: {
              type: 'string'
            }
          },
          type: 'object'
        },
        bunsenView
      })

      it('renders as expected', function () {
        expect(
          this.$(selectors.bunsen.renderer.text),
          'renders a bunsen text input'
        )
          .to.have.length(1)

        expect(
          findTextInputs(),
          'renders one text input'
        )
          .to.have.length(1)

        expectTextInputWithState('bunsenForm-foo-input', {
          placeholder: ''
        })

        expect(
          this.$(selectors.bunsen.label).text().trim(),
          'renders expected label text'
        )
          .to.equal('Foo')

        expect(
          this.$(selectors.error),
          'does not have any validation errors'
        )
          .to.have.length(0)

        expect(
          ctx.props.onValidation.callCount,
          'informs consumer of validation results'
        )
          .to.equal(1)

        const validationResult = ctx.props.onValidation.lastCall.args[0]

        expect(
          validationResult.errors.length,
          'informs consumer there are no errors'
        )
          .to.equal(0)

        expect(
          validationResult.warnings.length,
          'informs consumer there are no warnings'
        )
          .to.equal(0)
      })
    })
  })
