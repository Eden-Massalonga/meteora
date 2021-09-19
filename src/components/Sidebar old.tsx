import React from 'react'
import styled from 'styled-components'
import { Formik, Field, Form } from 'formik'

const InputContainer = styled.div`
    height: 400px;
    width: 30%;
    padding: 10px;
`

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
`
const Title = styled.h6`
    color: gray;
`

const Sidebar = () => {

    return (
        <InputContainer>
            <Title>Your City Weather</Title>

            <Formik
                initialValues={{
                    city: '',
                    units: 'c'
                }}
                onSubmit={
                    (values) => {
                        console.log(values);

                    }
                }
            >

                {({ values }) => (
                    <Form>
                        <div id="my-radio-group">Units</div>
                        <div role="group" aria-labelledby="my-radio-group">
                            <label>
                                <Field type="radio" name="units" value="c" />
                                &deg;C
                            </label>
                            <label>
                                <Field type="radio" name="units" value="f" />
                                &deg;F
                            </label>
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </InputContainer>
    )
}

export default Sidebar
