oc exec -it quay-postgres-75c465757-4c8xq -n quay-enterprise -- /bin/bash -c 'echo "CREATE EXTENSION IF NOT EXISTS pg_trgm" | /opt/rh/rh-postgresql10/ro
ot/usr/bin/psql -d quay'
oc create serviceaccount quay-postgres -n quay-enterprise
oc adm policy add-scc-to-user anyuid -z system:serviceaccount:quay-enterprise:quay-postgres

oc apply -f quay-servieaccount.yaml 
oc adm policy add-scc-to-user anyuid system:serviceaccount:quay-enterprise:default

oc create secret generic quay-config-secret
oc apply -f quay.yaml
